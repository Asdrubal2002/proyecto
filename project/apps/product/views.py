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
from .models import Product, ProductOption, Option, ProductImage, Like
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
from django.utils import timezone
from django.db.models import Q
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, BasePermission

# Create your views here.


class ListProductsByCategoryView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, storeSlug, categorySlug, format=None):
        # Obtener la tienda o devolver un 404 si no se encuentra
        store = get_object_or_404(Store, slug=storeSlug)

        # Obtener la categoría o devolver un 404 si no se encuentra
        category = get_object_or_404(Category, store=store, slug=categorySlug)

        # Filtrar los productos por categoría y por si están activos
        products = Product.objects.filter(category=category, is_active=True).order_by('date_created')

        paginator = LargeSetPagination()
        results = paginator.paginate_queryset(products, request)
        products_serialized = ProductSerializer(results, many=True)
        
        # Devolver la lista de productos serializados
        return paginator.get_paginated_response({"products": products_serialized.data})

class ProductsByStore(APIView):
    def get(self, request, storeSlug, format=None):
        store = get_object_or_404(Store, slug=storeSlug)

        # Obtener todas las categorías activas de esa tienda
        active_categories = Category.objects.filter(store=store, is_active=True)

        # Obtener todos los productos que pertenecen a categorías activas
        # de la tienda y que están activos
        products = Product.objects.filter(
            category__in=active_categories,
            is_active=True,
        ).order_by("date_created")

        # Filtrar los productos para excluir aquellos que pertenecen a
        # categorías padres que estén desactivadas
        filtered_products = []
        for product in products:
            category = product.category
            # Verificar si la categoría padre está activa
            while category.parent:
                if not category.parent.is_active:
                    break  # Salir del bucle si la categoría padre está desactivada
                category = category.parent
            else:
                filtered_products.append(product)  # Agregar el producto si todas las categorías padre están activas

        paginator = LargeSetPagination()
        results = paginator.paginate_queryset(filtered_products, request)
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
        product_options = ProductOption.objects.filter(product=product, is_active=True)

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

        # Obtener el ID del producto y la cantidad de la solicitud
        product_id = data.get('product', None)
        quantity = data.get('quantity', 0)

        # Verificar si se proporcionó un ID de producto válido
        if product_id is None:
            return Response({"error": "ID de producto no proporcionado"}, status=status.HTTP_400_BAD_REQUEST)

        # Obtener el valor de la opción de la solicitud
        option_value = data.get('value', None)

        # Verificar si se proporcionó un valor de opción válido
        if option_value is None:
            return Response({"error": "Valor de opción no proporcionado"}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar si se proporcionó un ID de opción en la solicitud
        option_id = data.get('option', None)

        # Si se proporcionó un ID de opción, intenta obtener la opción existente
        if option_id:
            try:
                # Obtener la opción existente
                option = Option.objects.get(pk=option_id)
            except Option.DoesNotExist:
                return Response({"error": "La opción especificada no existe"}, status=status.HTTP_404_NOT_FOUND)

            # Si la opción existe, crear la relación con el producto
            product_option = ProductOption.objects.create(product_id=product_id, option=option, quantity=quantity)
            serialized_option = OptionSerializer(option).data

            return Response(serialized_option, status=status.HTTP_201_CREATED)
        else:
            # Si no se proporcionó un ID de opción, crear una nueva opción
            serializer = CreateOptionSerializer(data=data)

            if serializer.is_valid():
                # Guardar la nueva opción en la base de datos
                option = serializer.save()

                # Crear la relación con el producto
                product_option = ProductOption.objects.create(product_id=product_id, option=option, quantity=quantity)
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
            products = Product.objects.filter(category__in=categories).order_by('-date_created')

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
            date_created=timezone.now()  # Utilizar timezone.now() en lugar de datetime.now()
        )

        # Retornar una respuesta exitosa
        return Response(status=status.HTTP_200_OK)

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

class ListProductsByCategoryViewAdmin(APIView):
    permission_classes = (CanEditProduct,)

    def get(self, request, storeSlug, categorySlug, format=None):
        # Obtener la tienda o devolver un 404 si no se encuentra
        store = get_object_or_404(Store, slug=storeSlug)

        # Obtener la categoría o devolver un 404 si no se encuentra
        category = get_object_or_404(Category, store=store, slug=categorySlug)

        # Filtrar los productos por categoría y por si están activos
        products = Product.objects.filter(category=category)

        paginator = LargeSetPagination()
        results = paginator.paginate_queryset(products, request)
        products_serialized = ProductSerializer(results, many=True)
        
        # Devolver la lista de productos serializados
        return paginator.get_paginated_response({"products": products_serialized.data})
    
class CreateOptionsAPIView(APIView):
    permission_classes = (CanEditProduct,)

    def post(self, request, *args, **kwargs):
        # Agregar el usuario autenticado como administrador de la tienda
        data = request.data.copy() 
        data["store"] = request.user.store.id

        # Crear un serializador con los datos de la solicitud
        serializer = CreateOptionSerializer(data=data)

        if serializer.is_valid():
            # Guardar la opción en la base de datos
            option = serializer.save()
            
            # Obtener la representación serializada de la opción creada
            serialized_option = OptionSerializer(option).data

            return Response(serialized_option, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OptionListAdminAPIView(APIView):
    def get(self, request):
        try:
            # Obtener la tienda del usuario autenticado
            store = get_object_or_404(Store, administrator=request.user)
            # Obtener todas las opciones asociadas con la tienda del usuario autenticado
            options = Option.objects.filter(store=store)
            # Serializar las opciones
            serializer = OptionSerializer(options, many=True)
            # Devolver la respuesta con las opciones serializadas
            return Response({"options":serializer.data },status=status.HTTP_200_OK)
        except Store.DoesNotExist:
            # Si no se encuentra la tienda del usuario autenticado, devolver un mensaje de error
            return Response({"error": "No se encontró la tienda asociada al usuario autenticado."}, status=status.HTTP_404_NOT_FOUND)

class ProductLikeDislikeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_slug = request.data.get('product_slug', None)
        if product_slug is None:
            return Response({'error': 'El campo product_slug es requerido en el cuerpo del JSON.'}, status=status.HTTP_400_BAD_REQUEST)
        
        product = get_object_or_404(Product, slugProduct=product_slug)
        user = request.user
        try:
            like = Like.objects.get(user=user, product=product)
            like.delete()  # Eliminar el like/dislike si ya existe
            message = 'Like removido correctamente'
            user_liked = False
        except Like.DoesNotExist:
            Like.objects.create(user=user, product=product, liked=True)  # Agregar el like/dislike
            message = 'Like agregado correctamente'
            user_liked = True
        
        total_likes = Like.objects.filter(product=product, liked=True).count()  # Recalcular el recuento de likes
        return Response({'total_likes': total_likes, 'user_liked': user_liked}, status=status.HTTP_200_OK)

class ProductLikesAPIView(APIView):
    def get(self, request, slugProduct):
        product = get_object_or_404(Product, slugProduct=slugProduct)
        total_likes = Like.objects.filter(product=product, liked=True).count()

        user = request.user
        user_liked = False

        if user.is_authenticated:
            try:
                like = Like.objects.get(user=user, product=product)
                user_liked = True
            except Like.DoesNotExist:
                pass

        return Response({'total_likes': total_likes, 'user_liked': user_liked}, status=status.HTTP_200_OK)

class LikedProductsAPIView(APIView):
    def get(self, request, format=None):
        # Obtener el usuario actualmente autenticado
        user = request.user

        # Obtener todos los productos que el usuario ha marcado como "like"
        liked_products = Product.objects.filter(like__user=user, like__liked=True, category__store__is_active=True)

        # Contar el número de productos que le han gustado al usuario
        liked_products_count = liked_products.count()

        # Serializar los productos obtenidos
        serializer = ProductSerializer(liked_products, many=True)

        # Crear el objeto de respuesta que incluye los productos y el conteo
        response_data = {
            'count': liked_products_count,
            'products': serializer.data
        }

        return Response(response_data)



