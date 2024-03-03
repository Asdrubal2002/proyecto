from rest_framework import serializers
from .models import *
from apps.product.serializer import ProductSerializer, OptionSerializer,ProductOptionSerializer
from apps.store.serializers import StoreSerializer

class ItemCarritoSerializer(serializers.ModelSerializer):
    product_option = ProductOptionSerializer() 
    class Meta:
        model = ItemCarrito
        fields = ['id','product_option', 'quantity', 'subtotal',]

class CartSerializer(serializers.ModelSerializer):
    items = ItemCarritoSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()
    total_impuestos = serializers.SerializerMethodField()
    total_sin_impuestos = serializers.SerializerMethodField()
    store = StoreSerializer()

    def get_total(self, obj):
        # Calcula la suma total de los subtotales de los productos en el carrito
        return sum(item.subtotal for item in obj.items.all())
    
    def get_total_impuestos(self, obj):
        # Obtiene la suma total de impuestos de todos los elementos en el carrito
        return obj.total_impuestos
    
    def get_total_sin_impuestos(self, obj):
        # Obtiene la suma total de impuestos de todos los elementos en el carrito
        return obj.total_sin_impuestos

    class Meta:
        model = Cart
        fields = ['id','slug','user', 'store','created', 'items','total','total_impuestos','total_sin_impuestos']



