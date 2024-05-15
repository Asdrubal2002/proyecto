from rest_framework import serializers
from .models import Shipping


class ShippingSerializer(serializers.ModelSerializer):
    formatted_price = serializers.SerializerMethodField()

    class Meta:
        model = Shipping
        fields = ['id', 'name', 'store', 'time_to_delivery', 'price', 'formatted_price', 'additional_notes', 'is_active']

    def get_formatted_price(self, obj):
        # Obtener el precio formateado del envío
        return obj.formatted_price

class CreateShippingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipping
        fields = ['name', 'time_to_delivery', 'price', 'additional_notes']