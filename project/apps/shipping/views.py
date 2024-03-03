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
            return Response({'error': 'Missing cart_slug in request body'}, status=status.HTTP_400_BAD_REQUEST)

        cart = get_object_or_404(Cart, slug=cart_slug)
        shippings = cart.store.shipping_store.all()

        if not shippings.exists():
            return Response({'error': 'No shipping options available for this store'}, status=status.HTTP_404_NOT_FOUND)

        shipping_serializer = ShippingSerializer(shippings, many=True)

        return Response(
            {'shipping_options': shipping_serializer.data},
            status=status.HTTP_200_OK
        )



        
