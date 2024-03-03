from rest_framework import serializers
from .models import Category
from apps.store.serializers import StoreSerializer


class CategoriesStoreSerializer(serializers.ModelSerializer):
    store=StoreSerializer()
    class Meta:
        model=Category
        fields = [
            'id',
            'name',
            'store',
            'slug'
        ]
