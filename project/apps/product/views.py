from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializer import ProductSerializer, ProductOptionSerializer, OptionSerializer, CreateOptionSerializer
from .models import Product, ProductOption, Option
from apps.store.models import Store
from apps.product_category.models import Category
from django.http import JsonResponse

from django.db.models import Q
from django.shortcuts import render, get_object_or_404
from apps.store.pagination import SmallSetPagination, MediumSetPagination, LargeSetPagination
from django.db.models import Prefetch



# Create your views here.

class ListProductsByCategoryView(APIView):
    permission_classes = (permissions.AllowAny, )
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
        return paginator.get_paginated_response({'products': products_serialized.data})

class ProductsByStore(APIView):
    def get(self, request, storeSlug, format=None):
        store = get_object_or_404(Store, slug=storeSlug)

        # Obtener todas las categorías de esa tienda
        categories = Category.objects.filter(store=store)

        # Obtener todos los productos que pertenecen a esas categorías
        products = Product.objects.filter(category__in=categories, is_active=True).order_by('date_created')
        # Serializar los productos

        paginator = LargeSetPagination()
        results = paginator.paginate_queryset(products, request)
        products_serialized = ProductSerializer(results, many=True)

        # Devolver la lista de productos serializados
        return paginator.get_paginated_response({'products': products_serialized.data})

class SearchProductInView(APIView):
     def get(self, request, format=None):
            slugCategory = request.query_params.get('c')
            storeSlug = request.query_params.get('s')
            content = request.query_params.get('b')

            store = get_object_or_404(Store, slug=storeSlug)
            category = get_object_or_404(Category, store=store, slug=slugCategory)
            products = Product.objects.filter(category=category, name__icontains=content) | Product.objects.filter(category=category, description__icontains=content)

            if products.exists():
                # Aquí deberías serializar los productos encontrados
                products_serialized = [product.name for product in products]  # Ejemplo simple de serialización
                return Response({'products': products_serialized})
            else:
                return Response({'error': 'No se encontraron productos que coincidan con la búsqueda'}, status=status.HTTP_404_NOT_FOUND)

class ProductDetailView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, slugProduct, format=None):
        if Product.objects.filter(slugProduct=slugProduct).exists():
            product = Product.objects.get(slugProduct=slugProduct)
            serializer = ProductSerializer(product)
            return Response({'product': serializer.data})
        else:
            return Response({'error': 'Post doesnt exist'}, status=status.HTTP_404_NOT_FOUND)


class ProductOptionListView(APIView):
    def get(self, request, product_slug):
        # Obtener el producto específico o devolver un error 404 si no existe
        product = get_object_or_404(Product, slugProduct=product_slug)

        # Obtener las opciones del producto si existen
        product_options = ProductOption.objects.filter(product=product)

        if product_options.exists():
            # Serializar las opciones del producto si existen
            serializer = ProductOptionSerializer(product_options, many=True)
            return Response({'options': serializer.data}, status=status.HTTP_200_OK)
        else:
            # Devolver una respuesta vacía con código de estado 200
            return Response({'options': []}, status=status.HTTP_200_OK)
        
class OptionListView(APIView):
    def get(self, request, *args, **kwargs):
        # Obtener el usuario autenticado
        user = request.user

        # Filtrar las opciones asociadas al usuario autenticado
        options = Option.objects.filter(store__administrator=user)

        if not options:
            return Response({"message": "No hay opciones asociadas al usuario autenticado."}, status=status.HTTP_404_NOT_FOUND)

        # Serializar las opciones
        serializer = OptionSerializer(options, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
class CreateOptionAPIView(APIView):
    def post(self, request, *args, **kwargs):
        # Obtener los datos de la solicitud
        data = request.data

        # Agregar el usuario autenticado como administrador de la tienda
        data['store'] = request.user.store.id

        print(data['store'])

        # Crear un serializador con los datos de la solicitud
        serializer = CreateOptionSerializer(data=data)

        if serializer.is_valid():
            # Guardar la opción en la base de datos
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProductsAPIView(APIView):
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
            return paginator.get_paginated_response({'products': serialized_products.data})
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)








