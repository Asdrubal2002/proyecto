from rest_framework import serializers
from .models import Product, ProductImage,Option, ProductOption
from apps.product_category.serializer import CategoriesStoreSerializer
from decimal import Decimal

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
    price_with_tax = serializers.SerializerMethodField()
    is_low_stock_alert = serializers.BooleanField(read_only=True)


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
            'price_with_tax',  # Incluir el campo del precio con impuestos
            'is_low_stock_alert',  # Incluir el campo is_low_stock_alert

        ]

    def get_formatted_price(self, obj):
        # Formatear el precio como una cadena con separador de miles y decimales
        formatted_price = "{:,.2f}".format(obj.price)
        return formatted_price
    
    def get_price_with_tax(self, obj):
        # Convertir obj.price y obj.tax a Decimal antes de la operación
        price = Decimal(obj.price)
        tax = Decimal(obj.tax) / 100
        price_with_tax = price * (1 + tax)
        return "{:,.2f}".format(price_with_tax)  # Formatear el precio con impuestos

class ProductOptionSerializer(serializers.ModelSerializer):
    option = OptionSerializer()  
    product = ProductSerializer()
    class Meta:
        model = ProductOption
        fields = ['id','option','quantity','product','is_active', 'is_stock_low','low_stock_threshold'
]

class CreateOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'value', 'store']    