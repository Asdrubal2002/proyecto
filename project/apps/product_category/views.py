from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializer import (
    CategoriesStoreSerializer,
    CreateCategorySerializer,
    CategorieStoreSerializer,
)
from .models import Category
from apps.store.models import Store
from django.db.models import Q
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated
from .permissions import CanEditCategory
# Create your views here.


class ListCategoriesStoreView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, storeSlug, format=None):
        try:
            # Obtener la tienda por slug
            store = Store.objects.get(slug=storeSlug)
            categories = Category.objects.filter(store=store, is_active=True)
            result = []
            for category in categories:
                if not category.parent:
                    item = {}
                    item["id"] = category.id
                    item["name"] = category.name
                    item["slug"] = category.slug

                    item["sub_categories"] = []
                    for cat in categories:
                        sub_item = {}
                        if cat.parent and cat.parent.id == category.id:
                            sub_item["id"] = cat.id
                            sub_item["name"] = cat.name
                            sub_item["slug"] = cat.slug
                            sub_item["sub_categories"] = []

                            item["sub_categories"].append(sub_item)
                    result.append(item)
            return Response({"categories": result}, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            # Manejar el caso en que la tienda no exista
            return JsonResponse({"error": "Store not found"}, status=404)


class CategoryListViewAdmin(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        # Obtener el usuario autenticado
        user = request.user

        # Obtener la tienda asociada al usuario autenticado
        store = user.store

        # Obtener las categorías asociadas a la tienda del usuario autenticado
        categories = Category.objects.filter(store=store).order_by("-created_at")

        if not categories:
            return Response(
                {"message": "No hay categorías asociadas a esta tienda."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Serializar las categorías
        serializer = CategorieStoreSerializer(categories, many=True)

        return Response({"categories": serializer.data}, status=status.HTTP_200_OK)


class CreateCategoryAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        serializer = CreateCategorySerializer(data=request.data)
        if serializer.is_valid():
            # Agregar la tienda del usuario autenticado como propietario de la categoría
            serializer.validated_data["store"] = request.user.store
            # Crear la categoría
            category = serializer.save()

            # Listar todas las categorías después de crear una nueva
            categories = Category.objects.filter(store=request.user.store).order_by(
                "-created_at"
            )
            serializer = CategorieStoreSerializer(categories, many=True)

            return Response(
                {"categories": serializer.data}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryDeleteAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request, category_id):
        # Buscar la categoría por su ID
        category = Category.objects.filter(id=category_id).first()
        if not category:
            return Response(
                {"message": "La categoría no existe"}, status=status.HTTP_404_NOT_FOUND
            )

        # Verificar si la categoría pertenece a la tienda del usuario autenticado
        if category.store != request.user.store:
            return Response(
                {"message": "No tienes permiso para eliminar esta categoría"},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Eliminar la categoría
        category.delete()

        # Listar las categorías restantes
        remaining_categories = Category.objects.filter(
            store=request.user.store
        ).order_by("-created_at")
        serializer = CategorieStoreSerializer(remaining_categories, many=True)

        return Response({"categories": serializer.data}, status=status.HTTP_200_OK)


class CategoryStateAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        # Obtener el ID de la categoría del cuerpo de la solicitud
        category_id = request.data.get("category_id")

        # Verificar si se proporcionó un ID de categoría en la solicitud
        if not category_id:
            return Response(
                {
                    "message": "Se requiere el ID de la categoría en el cuerpo de la solicitud"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Buscar la categoría por su ID
        category = Category.objects.filter(id=category_id).first()
        if not category:
            return Response(
                {"message": "La categoría no existe"}, status=status.HTTP_404_NOT_FOUND
            )

        # Verificar si la categoría pertenece a la tienda del usuario autenticado
        if category.store != request.user.store:
            return Response(
                {"message": "No tienes permiso para modificar esta categoría"},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Cambiar el estado de is_active de la categoría
        category.is_active = not category.is_active
        category.save()

        new_state = "activo" if category.is_active else "inactivo"

        # Obtener todas las categorías de la tienda del usuario autenticado
        categories = Category.objects.filter(store=request.user.store).order_by(
            "-created_at"
        )

        # Serializar las categorías
        serializer = CategorieStoreSerializer(categories, many=True)

        # Devolver las categorías serializadas en la respuesta
        return Response(
            {
                "message": f"El estado de la categoría se ha cambiado a {new_state}",
                "categories": serializer.data,
            },
            status=status.HTTP_200_OK,
        )


class EditCategoryView(APIView):
    permission_classes = (CanEditCategory,)

    def put(self, request, format=None):
        data = self.request.data
        # Obtener el ID de la categoría de los datos recibidos
        category_id = data.get("id")
        try:
            # Obtener la instancia de la categoría desde la base de datos
            category = Category.objects.get(id=category_id)
        except Category.DoesNotExist:
            # Si la categoría no existe, devolver un error 404
            return Response(
                {"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND
            )

        # Serializar los datos recibidos
        serializer = CreateCategorySerializer(category, data=data)
        if serializer.is_valid():
            # Si los datos son válidos, guardar la categoría actualizada
            serializer.save()

            # Listar todas las categorías después de crear una nueva
            categories = Category.objects.filter(store=request.user.store).order_by(
                "-created_at"
            )
            serializer = CategorieStoreSerializer(categories, many=True)
            
            return Response({"categories":serializer.data}, status=status.HTTP_200_OK)
        else:
            # Si los datos no son válidos, devolver un error 400 con los errores de validación
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

