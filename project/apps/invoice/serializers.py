from rest_framework import serializers
from .models import Invoice, InvoiceStatus

from apps.user_profile.serializers import UserProfileSerializer, UserLocationSerializer
from apps.store.serializers import StoreSerializer
from apps.shipping.serializers import ShippingSerializer
from apps.cart.serializer import CartSerializer

class InvoiceStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceStatus
        fields = ['id', 'name']

        
class InvoiceSerializer(serializers.ModelSerializer):
    buyer=UserProfileSerializer()
    store=StoreSerializer()
    shipping_method=ShippingSerializer()
    shipping_location=UserLocationSerializer()
    cart=CartSerializer()
    status=InvoiceStatusSerializer()
    class Meta:
        model = Invoice
        fields = ['id', 'buyer', 'store', 'shipping_method', 'shipping_location', 'cart', 'total_amount', 'status','transaction_number','pdf_path']


class CreateInvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = ['buyer', 'store', 'shipping_method', 'shipping_location', 'cart','transaction_number']
