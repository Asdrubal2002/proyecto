from rest_framework import serializers
from .models import WishList
from apps.product.serializer import ProductSerializer
from apps.product.models import Product
from apps.store.serializers import StoreSerializer



class WishListSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = WishList
        fields = ['product',]

class WishListStoreSerializer(serializers.ModelSerializer):
    store = StoreSerializer()
    class Meta:
        model = WishList
        fields = ['store',]
