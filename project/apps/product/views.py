from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializer import (
    ProductSerializer,
    ProductOptionSerializer,
    OptionSerializer,
    CreateOptionSerializer,
    ProductSerializerPhotos
)
from .models import Product, ProductOption, Option, ProductImage
from apps.store.models import Store
from apps.product_category.models import Category
from django.http import JsonResponse

from django.db.models import Q
from django.shortcuts import render, get_object_or_404
from apps.store.pagination import (
    SmallSetPagination,
    MediumSetPagination,
    LargeSetPagination,
)
from django.db.models import Prefetch
from .permissions import CanEditProduct

from rest_framework.parsers import MultiPartParser, FormParser
from datetime import datetime

# Create your views here.


class ListProductsByCategoryView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, storeSlug, categorySlug, format=None):
        # Obtener la tienda o devolver un 404 si no se encuentra
        store = get_object_or_404(Store, slug=storeSlug)

        # Obtener la categoría o devolver un 404 si no se encuentra
        category = get_object_or_404(Category, store=store, slug=categorySlug)

        # Filtrar los productos por categoría y por si están activos
        products = Product.objects.filter(category=category, is_active=True)

        paginator = LargeSetPagination()
        results = paginator.paginate_queryset(products, request)
        products_serialized = ProductSerializer(results, many=True)

        # Devolver la lista de productos serializados
        return paginator.get_paginated_response({"products": products_serialized.data})

class ProductsByStore(APIView):
    def get(self, request, storeSlug, format=None):
        store = get_object_or_404(Store, slug=storeSlug)

        # Obtener todas las categorías de esa tienda
        categories = Category.objects.filter(store=store)

        # Obtener todos los productos que pertenecen a esas categorías
        products = Product.objects.filter(
            category__in=categories, is_active=True
        ).order_by("date_created")
        # Serializar los productos

        paginator = LargeSetPagination()
        results = paginator.paginate_queryset(products, request)
        products_serialized = ProductSerializer(results, many=True)

        # Devolver la lista de productos serializados
        return paginator.get_paginated_response({"products": products_serialized.data})

class SearchProductInView(APIView):
    def get(self, request, format=None):
        slugCategory = request.query_params.get("c")
        storeSlug = request.query_params.get("s")
        content = request.query_params.get("b")

        store = get_object_or_404(Store, slug=storeSlug)
        category = get_object_or_404(Category, store=store, slug=slugCategory)
        products = Product.objects.filter(
            category=category, name__icontains=content
        ) | Product.objects.filter(category=category, description__icontains=content)

        if products.exists():
            # Aquí deberías serializar los productos encontrados
            products_serialized = [
                product.name for product in products
            ]  # Ejemplo simple de serialización
            return Response({"products": products_serialized})
        else:
            return Response(
                {"error": "No se encontraron productos que coincidan con la búsqueda"},
                status=status.HTTP_404_NOT_FOUND,
            )

class ProductDetailView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, slugProduct, format=None):
        if Product.objects.filter(slugProduct=slugProduct).exists():
            product = Product.objects.get(slugProduct=slugProduct)
            serializer = ProductSerializer(product)
            return Response({"product": serializer.data})
        else:
            return Response(
                {"error": "Post doesnt exist"}, status=status.HTTP_404_NOT_FOUND
            )

class ProductOptionListView(APIView):
    def get(self, request, product_slug):
        # Obtener el producto específico o devolver un error 404 si no existe
        product = get_object_or_404(Product, slugProduct=product_slug)

        # Obtener las opciones del producto si existen
        product_options = ProductOption.objects.filter(product=product)

        if product_options.exists():
            # Serializar las opciones del producto si existen
            serializer = ProductOptionSerializer(product_options, many=True)
            return Response({"options": serializer.data}, status=status.HTTP_200_OK)
        else:
            # Devolver una respuesta vacía con código de estado 200
            return Response({"options": []}, status=status.HTTP_200_OK)

class OptionListView(APIView):
    def get(self, request, *args, **kwargs):
        # Obtener el usuario autenticado
        user = request.user

        # Filtrar las opciones asociadas al usuario autenticado
        options = Option.objects.filter(store__administrator=user)

        if not options:
            return Response(
                {"message": "No hay opciones asociadas al usuario autenticado."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Serializar las opciones
        serializer = OptionSerializer(options, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateOptionAPIView(APIView):
    permission_classes = (CanEditProduct,)

    def post(self, request, *args, **kwargs):
        # Obtener los datos de la solicitud
        data = request.data.copy() 

        # Agregar el usuario autenticado como administrador de la tienda
        data["store"] = request.user.store.id

        # Crear un serializador con los datos de la solicitud
        serializer = CreateOptionSerializer(data=data)

        if serializer.is_valid():
            # Guardar la opción en la base de datos
            option = serializer.save()

            # Obtener el producto y la opción relacionados
            product_id = data.get('product', None)
            option_id = option.id

            # Verificar si se proporcionó un ID de producto válido
            if product_id is None:
                return Response({"error": "ID de producto no proporcionado"}, status=status.HTTP_400_BAD_REQUEST)

            # Obtener el valor de quantity
            quantity = data.get('quantity', 0)

            # Crear una instancia de ProductOption y guardarla en la base de datos
            product_option = ProductOption.objects.create(product_id=product_id, option_id=option_id, quantity=quantity)
            
            # Obtener la representación serializada de la opción creada
            serialized_option = OptionSerializer(option).data

            return Response(serialized_option, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProductsAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        try:
            # Obtener la tienda del usuario autenticado
            store = request.user.store

            # Obtener todas las categorías de la tienda del usuario
            categories = store.categories_store.all()

            # Obtener todos los productos asociados a las categorías de la tienda del usuario
            products = Product.objects.filter(category__in=categories)

            paginator = LargeSetPagination()
            results = paginator.paginate_queryset(products, request)
            serialized_products = ProductSerializer(results, many=True)

            # Devolver la lista de productos serializados
            return paginator.get_paginated_response(
                {"products": serialized_products.data}
            )
        except Exception as e:
            return Response(
                {"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class EditProductView(APIView):
    permission_classes = (CanEditProduct,)

    def put(self, request, format=None):
        user = self.request.user

        data = self.request.data

        slugProduct = data["slug"]

        product = Product.objects.get(slugProduct=slugProduct)

        if data["name"]:
            if not (data["name"] == "undefined"):
                product.name = data["name"]
                product.save()
        if data["description"]:
            if not (data["description"] == "undefined"):
                product.description = data["description"]
                product.save()
        if data["category"] and data["category"] != "undefined":
            category_instance = Category.objects.get(id=data["category"])
            product.category = category_instance
            product.save()
        if data["price"]:
            if not (data["price"] == "undefined"):
                product.price = data["price"]
                product.save()

        return Response({"success": "post edited"})

class StatusProductView(APIView):
    permission_classes = (CanEditProduct,)

    def put(self, request, format=None):
        data = self.request.data
        slugProduct = data["slug"]
        product = Product.objects.get(slugProduct=slugProduct)
        # Cambiar el estado de is_active de la categoría
        product.is_active = not product.is_active
        product.save()
        return Response({"success": "is_active"})
    
class DeleteProductView(APIView):
    permission_classes = (CanEditProduct,)
    def delete(self, request, slug, format=None):
        product = Product.objects.get(slugProduct=slug)
        product.delete()
        return Response({'success': 'Post delete'})

class DeletePhotoProductView(APIView):
        permission_classes = (CanEditProduct,)

        def delete(self, request, id, format=None):
            print(id)

            imagen = ProductImage.objects.get(id=id)
            imagen.delete()

            return Response({'success': 'Post delete'})

class EditProductPhotosView(APIView):
    permission_classes = (CanEditProduct,)
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data

        slug_product = data["slug"]
        product = Product.objects.get(slugProduct=slug_product)

        photo = data.get("photo")  # Obtener la foto del request
        product_image = ProductImage.objects.create(product=product, photo=photo)

        # Puedes serializar el objeto de imagen del producto si lo necesitas
        serializer = ProductSerializerPhotos(product_image)

        return Response({"success": "Image uploaded", "id": product.id, "photo_url": product_image.photo.url})

class CreateProductView(APIView):
    permission_classes = (CanEditProduct,)

    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data

        # Obtener los datos de la solicitud
        name = data.get('name', '')
        category_id = data.get('category', None)
        description = data.get('description', '')
        price = data.get('price', 0)

        # Crear el objeto Product
        product = Product.objects.create(
            name=name,
            category_id=category_id,
            description=description,
            price=price,
            date_created=datetime.now()
        )

        # Retornar una respuesta exitosa
        return Response({"success": "Producto creado exitosamente"})

class ProductOptionsView(APIView):
    permission_classes = (CanEditProduct,)

    def get(self, request, slug, format=None):
        # Buscar el producto por su slug
        try:
            product = Product.objects.get(slugProduct=slug)
        except Product.DoesNotExist:
            return Response({"error": "Producto no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        # Obtener todas las opciones relacionadas con el producto
        product_options = ProductOption.objects.filter(product=product)

        # Serializar las opciones del producto
        serializer = ProductOptionSerializer(product_options, many=True)

        return Response({"options": serializer.data}, status=status.HTTP_200_OK)
        
class DeleteProductOptionView(APIView):
    def delete(self, request, option_id, format=None):
        try:
            option = ProductOption.objects.get(id=option_id)
            option.delete()
            return Response({"message": "Option deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except ProductOption.DoesNotExist:
            return Response({"error": "Option not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)






