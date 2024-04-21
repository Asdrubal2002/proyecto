from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from .models import Shipping
from .serializers import ShippingSerializer, CreateShippingSerializer
from apps.store.models import Store
from rest_framework.permissions import IsAuthenticated
from apps.cart.models import Cart


class GetShippingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, cart_slug, format=None):
        if not cart_slug:
            return Response(
                {"error": "Missing cart_slug in request body"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        cart = get_object_or_404(Cart, slug=cart_slug)
        shippings = cart.store.shipping_store.filter(
            is_active=True
        )  # Filtrar solo los envíos activos

        if not shippings.exists():
            return Response(
                {"error": "No shipping options available for this store"},
                status=status.HTTP_404_NOT_FOUND,
            )

        shipping_serializer = ShippingSerializer(shippings, many=True)

        return Response(
            {"shipping_options": shipping_serializer.data}, status=status.HTTP_200_OK
        )


class UserStoreShippingListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        # Obtener el usuario autenticado
        user = request.user

        try:
            # Obtener la tienda del usuario
            store = user.store
        except Store.DoesNotExist:
            return Response(
                {"error": "El usuario no tiene una tienda asociada."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Obtener los envíos de la tienda del usuario
        shippings = Shipping.objects.filter(store=store)

        # Serializar los envíos
        serialized_shippings = ShippingSerializer(
            shippings, many=True
        )  # Asume que tienes un serializador llamado ShippingSerializer

        return Response(
            {"shippings": serialized_shippings.data}, status=status.HTTP_200_OK
        )

class UserAddStoreShippingListView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        # Obtener el usuario autenticado
        user = request.user
        data = request.data

        # Validar los datos y proporcionar un valor predeterminado para 'price' si está vacío
        if 'price' in data:
            data['price'] = data['price'] if data['price'] else 0

        store = user.store

        serializer = CreateShippingSerializer(data=data)
        if serializer.is_valid():
            serializer.validated_data['store'] = store
            serializer.save()
            return Response({"shippings": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ShippingDeleteAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request, shipping_id):
        # Buscar el envío por su ID
        shipping = Shipping.objects.filter(id=shipping_id).first()
        if not shipping:
            return Response(
                {"message": "El envío no existe"}, status=status.HTTP_404_NOT_FOUND
            )

        # Verificar si el envío pertenece a la tienda del usuario autenticado
        if shipping.store != request.user.store:
            return Response(
                {"message": "No tienes permiso para eliminar este envío"},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Eliminar el envío
        shipping.delete()

        # Listar los envíos restantes
        remaining_shippings = Shipping.objects.filter(
            store=request.user.store
        )
        serializer = ShippingSerializer(remaining_shippings, many=True)

        return Response({"shippings": serializer.data}, status=status.HTTP_200_OK)
        
        

