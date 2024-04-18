from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from .models import Shipping
from .serializers import ShippingSerializer
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
