from django.db import models
from apps.product.models import Product, Option, ProductOption
from apps.store.models import Store
from django.conf import settings
import uuid

User = settings.AUTH_USER_MODEL
# Create your models here.

class Cart(models.Model):
    slug =  models.SlugField(max_length=255, unique=True, default=uuid.uuid4)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    @property
    def total_impuestos(self):
        # Calcula la suma total de impuestos de todos los elementos en el carrito
        return sum(item.product_option.product.tax * item.quantity for item in self.items.all())

    @property
    def total_sin_impuestos(self):
        # Calcula la suma total sin impuestos de todos los elementos en el carrito
        return sum(item.product_option.product.price * item.quantity for item in self.items.all())


class ItemCarrito(models.Model):
    product_option = models.ForeignKey(ProductOption, on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    quantity = models.PositiveIntegerField(default=1)
    
    @property
    def subtotal(self):
        # Obtén el precio y el impuesto del product_option
        product_option = self.product_option
        product = product_option.product
        price = product.price
        tax = product.tax
        
        # Calcula el subtotal sumando el impuesto por la cantidad
        subtotal_con_impuesto = (price + tax) * self.quantity
        return subtotal_con_impuesto
