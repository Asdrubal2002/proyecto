from django.db import models
from apps.user_profile.models import UserProfile, UserLocation
from apps.product.models import Product
from apps.shipping.models import Shipping
from apps.store.models import Store
from apps.cart.models import Cart
from django.db.models.signals import post_save
from django.dispatch import receiver
import uuid
from django.utils import timezone


# Create your models here.

class InvoiceStatus(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Invoice(models.Model):
    buyer = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=True, blank=True)
    store = models.ForeignKey(Store, on_delete=models.CASCADE, null=True, blank=True)
    shipping_method = models.ForeignKey(Shipping, on_delete=models.SET_NULL, null=True, blank=True)
    shipping_location = models.ForeignKey(UserLocation, on_delete=models.SET_NULL, null=True, blank=True)
    cart = models.ForeignKey(Cart, on_delete=models.SET_NULL, null=True, blank=True)  # o SET_DEFAULT dependiendo de tu caso
    total_amount = models.CharField(max_length=50) # Ahora puede ser nulo
    status = models.ForeignKey(InvoiceStatus, on_delete=models.SET_NULL, null=True, blank=True, default=1)
    transaction_number = models.CharField(max_length=20, unique=True, blank=True)  # Permitimos que sea nulo
    created_at = models.DateTimeField(default=timezone.now)  # Campo para almacenar la fecha de creación

    def __str__(self):
        return f'Factura #{self.id} - {self.buyer.firs_name}'
    
@receiver(post_save, sender=Invoice)
def generate_transaction_number(sender, instance, created, **kwargs):
    if created and not instance.transaction_number:
        # Generar un número de transacción único utilizando UUID
        instance.transaction_number = str(uuid.uuid4().hex[:12].upper())
        instance.save()





