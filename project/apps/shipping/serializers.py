from rest_framework import serializers
from .models import Shipping


class ShippingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipping
        fields = '__all__'

class CreateShippingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipping
        fields = ['name', 'time_to_delivery', 'price', 'additional_notes']