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

class CategorieStoreSerializer(serializers.ModelSerializer):
    parent=CategoriesStoreSerializer()  
    class Meta:
        model=Category
        fields = [
            'id',
            'name',
            'store',
            'slug',
            'parent',
            'is_active'
        ]

class CreateCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'parent', 'slug']