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
    formatted_price = serializers.SerializerMethodField()

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
            'sold',
            'date_created',
            'is_active',
            'images',
            'formatted_price',  # Incluir el campo del precio formateado

        ]

    def get_formatted_price(self, obj):
        # Formatear el precio como una cadena con separador de miles y decimales
        formatted_price = "{:,.2f}".format(obj.price)
        return formatted_price

class ProductOptionSerializer(serializers.ModelSerializer):
    option = OptionSerializer()  
    product = ProductSerializer()
    class Meta:
        model = ProductOption
        fields = ['id','option','quantity','product','is_active']

class CreateOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'value', 'store']    