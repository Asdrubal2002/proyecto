from rest_framework import serializers
from .models import Store, StorePolicy
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
            'get_formatted_created_on',
            'qr_code'
        ]

class CreateStoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
       
        exclude = ['is_active', 'likes', 'complaints', 'verified', 'created_on','logo','banner','delivery']

class StorePolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = StorePolicy
        fields = 'name', "policy_text"
        
