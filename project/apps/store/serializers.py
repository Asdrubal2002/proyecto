from rest_framework import serializers
from .models import Store
from apps.store_category.serializers import CategorySerializer
from apps.locations.serializers import CiudadSerializer

class StoreSerializer(serializers.ModelSerializer):
    category=CategorySerializer()
    city=CiudadSerializer()

    class Meta:
        model = Store
        fields = [
            'id',
            'administrator',
            'name',
            'category',
            'description',
            'location',
            'phone',
            'email',
            'logo',
            'banner',
            'schedule',
            'delivery',
            'nit',
            'verified',
            'is_active',
            'created_on',
            'url_pay',
            'account_pay',
            'slug',
            'likes',
            'complaints',
            'city',
        ]
        
