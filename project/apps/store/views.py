from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.db.models import Q, Func
from django.core.files.base import ContentFile

from apps.store.models import Store, StorePolicy, StoreLike, UserStoreAssociation, FAQ
from apps.store.serializers import (
    StoreSerializer,
    CreateStoreSerializer,
    StorePolicySerializer,
    WishListStoreSerializer,
    UserAccountSerializer,
    FAQSerializer
)
from apps.store_category.models import Category
from django.shortcuts import get_object_or_404
from django.core.files.storage import default_storage

from .pagination import SmallSetPagination, MediumSetPagination, LargeSetPagination
from rest_framework.permissions import IsAuthenticated, BasePermission

from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from rest_framework.parsers import MultiPartParser, FormParser
from .permissions import CanEditStore
from rest_framework.authentication import SessionAuthentication
from rest_framework.exceptions import NotFound
from apps.user.models import UserAccount
# Create your views here.

import unicodedata

class RemoveAccents(Func):
    function = 'UNACCENT'
    template = "%(function)s(%(expressions)s)"

def normalize_text(text):
    return unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('ascii')


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
            slug = request.query_params.get("c", "")
            search = request.query_params.get("s", "")

            # Normalize search text
            search_normalized = normalize_text(search)

            if len(search) == 0:
                search_results = Store.objects.order_by("created_on").all()
            else:
                search_results = Store.objects.order_by("-created_on").annotate(
                    normalized_description=RemoveAccents('description'),
                    normalized_name=RemoveAccents('name'),
                    normalized_location=RemoveAccents('location')
                ).filter(
                    Q(normalized_description__icontains=search_normalized)
                    | Q(normalized_name__icontains=search_normalized)
                    | Q(normalized_location__icontains=search_normalized),
                    is_active=True,
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

            search_results = search_results.order_by("-created_on").filter(
                category=category, is_active=True
            )

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
        # Copiar los datos de la solicitud
        data = request.data.copy()
        
        # Agregar el usuario autenticado como administrador en forma de lista
        data["administrator"] = [request.user.id]
        print(data)

        # Crear el serializador con los datos actualizados
        serializer = CreateStoreSerializer(data=data)
        
        # Verificar si los datos son válidos
        if serializer.is_valid():

            # Obtener el usuario actual
            user = request.user

            # Establecer al usuario como el administrador principal de la tienda
            user.is_primary_store_admin = True
            user.save()

            # Guardar la tienda en la base de datos
            store = serializer.save()

            # Renderizar la plantilla HTML
            html_message = render_to_string(
                "stores/store_created_email.html", {"store_data": request.data}
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
        else:
            errors = serializer.errors
            response_data = {}

            # Verificar si hay errores para el campo "slug"
            if 'slug' in errors:
                response_data['slug_error'] = "Ya existe una tienda registrada con esta dirección. Por favor, intenta con otra."
                return Response(response_data, status=status.HTTP_409_CONFLICT)  # Código de estado 409: Conflicto

            # Verificar si hay errores para el campo "email"
            if 'email' in errors:
                response_data['email_error'] = "Ya existe una tienda registrada con este correo electrónico."
                return Response(response_data, status=status.HTTP_409_CONFLICT)  # Código de estado 409: Conflicto

            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        
class UserStoreAPIView(APIView):
    def get(self, request, *args, **kwargs):
        # Obtener el usuario autenticado
        user = request.user

        try:
            # Buscar la tienda asociada al usuario autenticado
            store = Store.objects.get(administrator=user)
            serializer = StoreSerializer(store)
            return Response({"store": serializer.data}, status=status.HTTP_200_OK)

        except Store.DoesNotExist:
            return Response(
                "El usuario no tiene una tienda asociada",
                status=status.HTTP_204_NO_CONTENT,
            )

class EditStoreLogoView(APIView):
    permission_classes = (CanEditStore,)

    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data

        # Verifica si se ha enviado la imagen del logo
        if "logo" in data:
            logo_file = data["logo"]

            # Obtiene el objeto Store del usuario autenticado
            store = request.user.stores.first()  # Asumiendo que el usuario está asociado a una única tienda

            # Elimina el logo existente, si lo hay
            if store.logo:
                default_storage.delete(store.logo.path)

            # Guarda la nueva imagen del logo en la ruta personalizada definida en el modelo
            store.logo.save(logo_file.name, logo_file, save=True)

            return Response({"success": "Logo uploaded"})
        else:
            return Response({"error": "Logo image is required"})

class EditStoreBannerView(APIView):
    permission_classes = (CanEditStore,)
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data

        # Verifica si se ha enviado la imagen del banner
        if "banner" in data:
            banner_file = data["banner"]

            # Obtiene el objeto Store del usuario autenticado
            store = request.user.stores.first()  # Asumiendo que el usuario está asociado a una única tienda
            #store = user.store

            # Elimina el banner existente, si lo hay
            if store.banner:
                default_storage.delete(store.banner.path)

            # Guarda la nueva imagen del banner en la ruta personalizada definida en el modelo
            store.banner.save(banner_file.name, banner_file, save=True)

            return Response({"success": "Banner uploaded"})
        else:
            return Response({"error": "Banner image is required"})

class StorePolicyCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = StorePolicySerializer(data=request.data)
        if serializer.is_valid():
            # Obtener el usuario autenticado
            user = request.user

            # Verificar si el usuario tiene al menos una tienda asociada
            user_stores = user.stores.all()
            if not user_stores:
                return Response(
                    {"error": "El usuario autenticado no tiene una tienda asociada"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Tomar la primera tienda asociada al usuario
            store = user_stores.first()

            # Guardar la política con la tienda asociada al usuario
            serializer.save(store=store)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StorePolicyListByStoreAPIView(APIView):
    def get(self, request, store_slug, format=None):
        # Obtenemos la tienda por su slug
        store = get_object_or_404(Store, slug=store_slug)
        try:
            # Filtramos las políticas por la tienda encontrada
            policies = StorePolicy.objects.filter(store=store)
            serializer = StorePolicySerializer(policies, many=True)
            return Response({"policies": serializer.data}, status=status.HTTP_200_OK)
        except StorePolicy.DoesNotExist:
            return Response(
                {"error": "No se encontraron políticas para esta tienda"},
                status=status.HTTP_404_NOT_FOUND,
            )

class EditStoreView(APIView):
    permission_classes = (CanEditStore,)

    def put(self, request, format=None):
        user = self.request.user
        data = self.request.data
        store = request.user.stores.first()  # Asumiendo que el usuario está asociado a una única tienda

        # Actualizar campos de texto
        text_fields = ["description", "address", "location", "phone", "email", "schedule", "nit"]
        for field in text_fields:
            if data.get(field) and data[field] != "undefined":
                setattr(store, field, data[field])

        # Eliminar información si los campos llegan vacíos
        empty_fields = ["instagram", "facebook", "x_red_social"]
        for field in empty_fields:
            setattr(store, field, data.get(field))

        store.save()

        return Response({"success": "Banner uploaded"}, status=status.HTTP_200_OK)

class StoreLikeDislikeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        store_slug = request.data.get('store_slug', None)
        if store_slug is None:
            return Response({'error': 'El campo store_slug es requerido en el cuerpo del JSON.'}, status=status.HTTP_400_BAD_REQUEST)
        
        store = get_object_or_404(Store, slug=store_slug)
        user = request.user

        try:
            store_like = StoreLike.objects.get(user=user, store=store)
            store_like.delete()  # Eliminar el like/dislike si ya existe
            message = 'Like removido correctamente'
            user_liked = False
        except StoreLike.DoesNotExist:
            StoreLike.objects.create(user=user, store=store, liked=True)  # Agregar el like/dislike
            message = 'Like agregado correctamente'
            user_liked = True
        
        total_likes = StoreLike.objects.filter(store=store, liked=True).count()  # Recalcular el recuento de likes
        return Response({'total_likes': total_likes, 'user_liked': user_liked}, status=status.HTTP_200_OK)

class StoreLikesAPIView(APIView):
    def get(self, request, storeSlug):
        store = get_object_or_404(Store, slug=storeSlug)
        total_likes = StoreLike.objects.filter(store=store, liked=True).count()

        return Response({'total_likes': total_likes}, status=status.HTTP_200_OK)
    
class LikedStoresAPIView(APIView):
    def get(self, request, format=None):
        user = request.user
        liked_stores = StoreLike.objects.filter(user=user, liked=True, store__is_active=True)
        serializer = WishListStoreSerializer(liked_stores, many=True)
        count = liked_stores.count()
        response_data = {
            'count': count,
            'stores': serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)
    
class StoreUsersListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            store = request.user.stores.first()  # Asumiendo que el usuario está asociado a una única tienda
            if not store:
                return Response({"error": "No tienes ninguna tienda asociada"}, status=status.HTTP_404_NOT_FOUND)
            
            # Obtener los usuarios asociados a la tienda
            users = store.administrator.all()

            # Serializar los datos de los usuarios
            serializer = UserAccountSerializer(users, many=True)

            return Response({"partners": serializer.data}, status=status.HTTP_200_OK)

        except Store.DoesNotExist:
            return Response({"error": "Tienda no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        
class AssociateUserToStoreAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        identification = request.data.get('identification')

        if not email or not identification:
            return Response({"error": "Email and identification are required"}, status=status.HTTP_400_BAD_REQUEST)

        user = get_object_or_404(UserAccount, email=email, userprofile__identification=identification)
        
        # Obtener la tienda del usuario autenticado
        store = request.user.stores.first()

        if not store:
            return Response({"error": "You do not have a store associated with your account"}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar si el usuario autenticado es administrador de la tienda
        if request.user not in store.administrator.all():
            return Response({"error": "You do not have permission to associate users with this store"}, status=status.HTTP_403_FORBIDDEN)

        # Verificar si el usuario ya está asociado con otra tienda
        existing_association = UserStoreAssociation.objects.filter(user=user).exclude(store=store).exists()
        if existing_association:
            return Response({"error": "El usuario ya está asociado con otra tienda."}, status=status.HTTP_400_BAD_REQUEST)

        # Asociar al usuario con la tienda en UserStoreAssociation
        association, created = UserStoreAssociation.objects.get_or_create(user=user, store=store)

        # Asociar al usuario con la tienda en el modelo Store
        store.administrator.add(user)
        
        # Activar el campo is_seller
        user.is_seller = True
        user.save()

        if created:
            return Response({"message": "User successfully associated with the store"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "User is already associated with the store"}, status=status.HTTP_200_OK)

class DeactivateSellerAPIView(APIView):
    def put(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        
        if not user_id:
            return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        user = get_object_or_404(UserAccount, id=user_id)
        
        # Toggle the seller status
        user.is_seller = not user.is_seller
        user.save()
        
        if user.is_seller:
            return Response({"message": "User is now activated as a seller"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "User is now deactivated as a seller"}, status=status.HTTP_200_OK)
         
class RemoveAssociateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Obtener el usuario autenticado y su tienda asociada
        user = request.user
        store = user.stores.first()

        if not store:
            return Response({"error": "Authenticated user does not have an associated store"}, status=status.HTTP_400_BAD_REQUEST)

        # Obtener el ID del usuario a desasociar de la tienda
        user_id = request.data.get('user_id')
        
        if not user_id:
            return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar si el usuario a desasociar está asociado con la tienda del usuario autenticado
        association = get_object_or_404(UserStoreAssociation, user_id=user_id, store=store)
        
        if association:
            # Obtener el usuario a desasociar
            user_to_remove = association.user
            # Eliminar la asociación del usuario con la tienda
            association.delete()
            # Desactivar la propiedad is_seller del usuario
            user_to_remove.is_seller = False
            user_to_remove.save()
            # Eliminar la asociación del usuario con la tienda en el modelo Store
            store.administrator.remove(user_to_remove)
            return Response({"message": "User successfully removed from store and is_seller deactivated"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Specified user is not associated with the store"}, status=status.HTTP_400_BAD_REQUEST)

class FAQRetrieveByStoreSlugAPIView(APIView):
    def get(self, request, store_slug, format=None):
        # Obtenemos la tienda por su slug
        store = get_object_or_404(Store, slug=store_slug)
        try:
            # Filtramos las preguntas frecuentes por la tienda encontrada
            faqs = FAQ.objects.filter(store=store)
            serializer = FAQSerializer(faqs, many=True)
            return Response({"faqs": serializer.data}, status=status.HTTP_200_OK)
        except FAQ.DoesNotExist:
            return Response(
                {"error": "No se encontraron preguntas frecuentes para esta tienda"},
                status=status.HTTP_404_NOT_FOUND,
            )


class FAQCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = FAQSerializer(data=request.data)
        if serializer.is_valid():
            # Obtener el usuario autenticado
            user = request.user

            # Verificar si el usuario tiene al menos una tienda asociada
            user_stores = user.stores.all()
            if not user_stores:
                return Response(
                    {"error": "El usuario autenticado no tiene una tienda asociada"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Tomar la primera tienda asociada al usuario
            store = user_stores.first()

            # Guardar la FAQ con la tienda asociada al usuario
            serializer.save(store=store)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)      

class ListSearchViewOnline(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        search_query = request.query_params.get("q", "").strip()
        normalized_query = normalize_text(search_query)

        if not search_query:
            search_results = Store.objects.all().order_by("created_on")
        else:
            search_results = Store.objects.filter(
                Q(name__icontains=normalized_query)
                | Q(location__icontains=normalized_query),
                is_active=True,
            ).order_by("-created_on")[:10]

        serializer = StoreSerializer(search_results, many=True)
        return Response({"search_stores": serializer.data})