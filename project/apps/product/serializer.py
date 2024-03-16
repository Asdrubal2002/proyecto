from rest_framework import serializers
from .models import Product, ProductImage,Option, ProductOption
from apps.product_category.serializer import CategoriesStoreSerializer

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'value']

        
class ProductSerializerPhotos(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = [
            'id',
            'photo'
        ]

class ProductSerializer(serializers.ModelSerializer):
    category=CategoriesStoreSerializer()
    images = ProductSerializerPhotos(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'category',
            'description',
            'slugProduct',
            'price',
            'tax',
            'views',
            'quantity',
            'sold',
            'date_created',
            'is_active',
            'likes',
            'images',
        ]

class ProductOptionSerializer(serializers.ModelSerializer):
    option = OptionSerializer()  
    product = ProductSerializer()
    class Meta:
        model = ProductOption
        fields = ['id','option','quantity','product']

class CreateOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'value', 'store']    