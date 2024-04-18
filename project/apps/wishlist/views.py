from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import WishList, WishListStore
from apps.product.models import Product
from apps.store.models import Store

from .serializers import WishListSerializer,WishListStoreSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db import IntegrityError
from django.db.models import ProtectedError
from django.db.models import F



# Create your views here.


class WishListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        # Obtener el usuario actualmente autenticado
        user = request.user

        # Obtener todos los productos en la lista de deseos del usuario actual
        wish_list_products = WishList.objects.filter(user=user, 
                                                     product__is_active=True, # Filtrar solo productos activos
                                                     product__category__store__is_active=True,  # Filtrar solo productos de tiendas activas
                                                     )

        # Serializar los productos de la lista de deseos
        serializer = WishListSerializer(wish_list_products, many=True)

        wish_count = len(wish_list_products)

        response_data = {
            "wishlist": serializer.data,
            "wish_count": wish_count,
        }

        # Devolver la lista de productos de la lista de deseos
        return Response(response_data, status=status.HTTP_200_OK)


class AddToWishListView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        # Obtener el usuario actualmente autenticado
        user = request.user

        # Obtener el slug del producto del cuerpo de la solicitud
        product_slug = request.data.get('product_slug')

        # Buscar el producto por el slug
        product = get_object_or_404(Product, slugProduct=product_slug)

        try:
            # Verificar si ya existe una entrada en la lista de deseos para este usuario y producto
            wish_list_item = WishList.objects.get(user=user, product=product)
            
            # Si la entrada ya existe, eliminarla de la lista de deseos
            wish_list_item.delete() 

            Product.objects.filter(slugProduct=product_slug).update(likes=F('likes') - 1)

            # Obtener la lista de deseos actualizada para el usuario
            wishlist = WishList.objects.filter(user=user)

            # Serializar la lista de deseos actualizada y devolverla en la respuesta
            serializer = WishListSerializer(wishlist, many=True)
            return Response({"wishlist":serializer.data}, status=status.HTTP_200_OK)
        
        except WishList.DoesNotExist:
            # Si no existe una entrada, crear una nueva instancia de WishList
            wish_list_item = WishList(user=user, product=product)
            wish_list_item.save()

            Product.objects.filter(slugProduct=product_slug).update(likes=F('likes') + 1)

            # Serializar la instancia recién creada y devolver la respuesta
            serializer = WishListSerializer(wish_list_item)
            return Response({"wishlist":serializer.data}, status=status.HTTP_201_CREATED)

        except (IntegrityError, ProtectedError):
            # Si hay un error de integridad al eliminar el elemento, devuelve un mensaje de error
            return Response({'detail': 'Error al procesar la solicitud.'}, status=status.HTTP_400_BAD_REQUEST)


class WishListStoresView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        # Obtener el usuario actualmente autenticado
        user = request.user

        # Obtener todos los productos en la lista de deseos del usuario actual
        wish_list_stores = WishListStore.objects.filter(user=user, store__is_active=True)

        # Serializar los productos de la lista de deseos
        serializer = WishListStoreSerializer(wish_list_stores, many=True)

        wish_count = len(wish_list_stores)

        response_data = {
            "wishlist_stores": serializer.data,
            "wish_count_stores": wish_count,
        }

        # Devolver la lista de productos de la lista de deseos
        return Response(response_data, status=status.HTTP_200_OK)
    

class AddToWishListStoreView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        # Obtener el usuario actualmente autenticado
        user = request.user

        # Obtener el slug del producto del cuerpo de la solicitud
        store_slug = request.data.get('store_slug')

        # Buscar el producto por el slug
        store = get_object_or_404(Store, slug=store_slug)

        try:
            # Verificar si ya existe una entrada en la lista de deseos para este usuario y producto
            wish_list_item = WishListStore.objects.get(user=user, store=store)
            
            # Si la entrada ya existe, eliminarla de la lista de deseos
            wish_list_item.delete()

            Store.objects.filter(slug=store_slug).update(likes=F('likes') - 1)


            wish_list_stores = WishListStore.objects.filter(user=user)

            # Serializar los productos de la lista de deseos
            serializer = WishListStoreSerializer(wish_list_stores, many=True)

            return Response({'wishlist_stores': serializer.data}, status=status.HTTP_200_OK)

        except WishListStore.DoesNotExist:
            # Si no existe una entrada, crear una nueva instancia de WishList
            wish_list_item = WishListStore(user=user, store=store)
            wish_list_item.save()

            Store.objects.filter(slug=store_slug).update(likes=F('likes') + 1)

            # Serializar la instancia recién creada y devolver la respuesta
            serializer = WishListStoreSerializer(wish_list_item)
            return Response({"wishlist_stores":serializer.data}, status=status.HTTP_201_CREATED)

        except (IntegrityError, ProtectedError):
            # Si hay un error de integridad al eliminar el elemento, devuelve un mensaje de error
            return Response({'detail': 'Error al procesar la solicitud.'}, status=status.HTTP_400_BAD_REQUEST)