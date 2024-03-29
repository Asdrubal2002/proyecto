from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.db.models import Q


from apps.store.models import Store
from apps.store.serializers import StoreSerializer, CreateStoreSerializer
from apps.store_category.models import Category
from django.shortcuts import get_object_or_404

from .pagination import SmallSetPagination, MediumSetPagination, LargeSetPagination
from rest_framework.permissions import IsAuthenticated, BasePermission

from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags


# Create your views here.


class StoreDetailview(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, storeSlug, format=None):
        # Utilizar get_object_or_404 para simplificar la obtención del objeto o devolver un 404
        store = get_object_or_404(Store, slug=storeSlug)

        # Serializar el objeto store
        store_serialized = StoreSerializer(store)

        # Devolver la respuesta serializada
        return Response({"store": store_serialized.data}, status=status.HTTP_200_OK)


class ListStoresView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        sortBy = request.query_params.get("sortBy")

        if not (sortBy == "name" or sortBy == "location"):
            sortBy = "-likes"

        order = request.query_params.get("order")
        limit = request.query_params.get("limit")

        if not limit:
            limit = 6

        try:
            limit = int(limit)
        except:
            return Response(
                {"error": "Limit must be an integer"}, status=status.HTTP_404_NOT_FOUND
            )

        if limit <= 0:
            limit = 6

        if order == "desc":
            sortBy = "-" + sortBy
            stores = Store.objects.order_by(sortBy).all()[: int(limit)]
        elif order == "asc":
            stores = Store.objects.order_by(sortBy).all()[: int(limit)]
        else:
            stores = Store.objects.order_by(sortBy).all()

        paginator = SmallSetPagination()
        results = paginator.paginate_queryset(stores, request)
        serializer = StoreSerializer(results, many=True)

        if stores:
            return paginator.get_paginated_response({"stores": serializer.data})
        else:
            return Response(
                {"error": "No stores to list"}, status=status.HTTP_404_NOT_FOUND
            )


class ListSearchView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        if Store.objects.all().exists():
            slug = request.query_params.get("c")
            search = request.query_params.get("s")

            print(slug, search)

            if len(search) == 0:
                search_results = Store.objects.order_by("likes").all()
            else:
                search_results = Store.objects.filter(
                    Q(description__icontains=search)
                    | Q(name__icontains=search)
                    | Q(location__icontains=search)
                )

            if len(slug) == 0:
                paginator = SmallSetPagination()
                results = paginator.paginate_queryset(search_results, request)
                serializer = StoreSerializer(results, many=True)
                return paginator.get_paginated_response(
                    {"search_stores": serializer.data}
                )

            if not Category.objects.filter(slug=slug).exists():
                return Response(
                    {"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND
                )

            category = Category.objects.get(slug=slug)

            search_results = search_results.order_by("-likes").filter(category=category)

            paginator = LargeSetPagination()
            results = paginator.paginate_queryset(search_results, request)
            serializer = StoreSerializer(results, many=True)
            return paginator.get_paginated_response({"search_stores": serializer.data})
        else:
            return Response(
                {"error": "No stores found"}, status=status.HTTP_404_NOT_FOUND
            )


class ListRelatedView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, storeSlug, format=None):
        try:
            store_id = storeSlug
        except:
            return Response(
                {"error": "Store slug must be an integer"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Verificar si existe la tienda con el slug dado
        try:
            store = Store.objects.get(slug=store_id)
        except Store.DoesNotExist:
            return Response(
                {"error": "Store with this slug does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )

        category = store.category

        # Obtener tiendas relacionadas basadas en la categoría de la tienda
        related_stores = (
            Store.objects.filter(category=category)
            .exclude(slug=store_id)
            .order_by("-likes")
        )

        if related_stores.exists():
            # Limitar el número de tiendas relacionadas a 3
            related_stores = related_stores[:3]
            serialized_stores = StoreSerializer(related_stores, many=True)
            return Response(
                {"related_stores": serialized_stores.data}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"error": "No related stores found"}, status=status.HTTP_200_OK
            )


class ListStoreByCategoryView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        if Store.objects.all().exists():

            slug = request.query_params.get("slug")
            category = Category.objects.get(slug=slug)
            print(category)

            stores = Store.objects.order_by("-likes").all()

            # # Si la categoría tiene un padre, filtrar sólo por esta categoría y no por el padre también
            # if category.parent:
            #     posts = posts.filter(category=category)

            # # Si la categoría no tiene una categoría padre, significa que ella misma es una categoría padre
            # else:

            # Filtrar categoria sola
            if not Category.objects.filter(parent=category).exists():
                stores = stores.filter(category=category)
            # Si esta categoría padre tiene hijos, filtrar por la categoría padre y sus hijos
            else:
                sub_categories = Category.objects.filter(parent=category)

                filtered_categories = [category]

                for cat in sub_categories:
                    filtered_categories.append(cat)

                filtered_categories = tuple(filtered_categories)

                stores = stores.filter(category__in=filtered_categories)

                print(stores)

            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(stores, request)
            serializer = StoreSerializer(results, many=True)

            return paginator.get_paginated_response(
                {"store_list_category": serializer.data}
            )
        else:
            return Response(
                {"error": "No stores found"}, status=status.HTTP_404_NOT_FOUND
            )


class IsSellerOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        # Implementa la lógica para verificar si el usuario es un vendedor o no
        return request.user.is_authenticated and request.user.is_seller


class CreateStoreAPIView(APIView):
    permission_classes = [IsAuthenticated, IsSellerOrReadOnly]

    def post(self, request, *args, **kwargs):
        # Asignar el usuario autenticado como administrador de la tienda

        request.data["administrator"] = request.user.id

        print(request.data)

        serializer = CreateStoreSerializer(data=request.data)
        if serializer.is_valid():
            # Guardar la tienda en la base de datos
            store = serializer.save()

            # Renderizar la plantilla HTML
            html_message = render_to_string(
                "store_created_email.html", {"username": request.user.email}
            )

            # Enviar correo electrónico al usuario
            subject = "Tienda creada exitosamente"
            from_email = "tu_correo@example.com"
            to_email = [request.user.email]
            send_mail(
                subject,
                strip_tags(html_message),
                from_email,
                to_email,
                html_message=html_message,
                fail_silently=True,
            )

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserStoreAPIView(APIView):
    def get(self, request, *args, **kwargs):
        # Obtener el usuario autenticado
        user = request.user

        try:
            # Buscar la tienda asociada al usuario autenticado
            store = Store.objects.get(administrator=user)
            serializer = StoreSerializer(store)
            return Response(
                {"store": serializer.data}, status=status.HTTP_200_OK
            )

        except Store.DoesNotExist:
            return Response(
                "El usuario no tiene una tienda asociada",
                status=status.HTTP_404_NOT_FOUND,
            )
