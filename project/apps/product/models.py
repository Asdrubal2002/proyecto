from django.db import models
from datetime import datetime
from apps.product_category.models import Category
from django.conf import settings
import uuid
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.store.models import Store
from django.utils import timezone
from django.utils import formats

from ckeditor.fields import RichTextField

User = settings.AUTH_USER_MODEL
import os

# Create your models here.


def product_directory_path_store(instance, filename):
    # Obtener el slug del producto
    product_slug = instance.product.slugProduct
    # Obtener el slug de la tienda
    store_slug = instance.product.category.store.slug
    # Retornar la ruta de almacenamiento con el slug de la tienda y del producto
    return f"productos/{store_slug}/{product_slug}/{filename}"


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    liked = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)

class Product(models.Model):
    class Meta:
        verbose_name = "producto"
        verbose_name_plural = "productos"

    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = RichTextField()
    slugProduct = models.SlugField(max_length=255, unique=True, default=uuid.uuid4)
    price = models.DecimalField(max_digits=20, decimal_places=2)
    tax = models.DecimalField(max_digits=10, decimal_places=0, default=0, blank=True,  null=True)  # Cambiado a entero
    sold = models.IntegerField(default=0)
    date_created = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=False)
    is_low_stock_alert = models.BooleanField(default=False)
    discount = models.DecimalField(max_digits=5, decimal_places=0, default=0, blank=True,  null=True) #descuento del price, no del price + tax, solo price


    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        # Verificar si el producto tiene un país asociado
        if self.category.store.city.estado_o_departamento.pais.currency.decimal_places:
            # Obtener la cantidad de decimales de la moneda del país
            decimal_places = self.category.store.city.estado_o_departamento.pais.currency.decimal_places
            # Redondear el precio al número de decimales especificado
            self.price = round(float(self.price), decimal_places)
        
        super().save(*args, **kwargs)

    @property
    def formatted_price(self):
        # Formatear el precio con separador de miles
        return formats.number_format(self.price, decimal_pos=self.price % 1)
    
    @property
    def price_with_tax(self):
        return self.price * (1 + self.tax / 100)
    
    # @property
    # def formatted_price_with_discount(self):
    #     # Calcular el precio con descuento
    #     price_with_discount = self.price * (1 - self.discount / 100)
    #     # Formatear el precio con descuento de la misma manera que el precio original y el precio con impuestos incluidos
    #     return "{:,.2f}".format(price_with_discount)
        
    
    def check_stock_level(self):
        for option in self.product_options.all():
            option.check_stock_level()

class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, related_name="images", on_delete=models.CASCADE
    )
    photo = models.ImageField(upload_to=product_directory_path_store)
    # Puedes agregar campos adicionales si es necesario, como una descripción de la imagen

    def __str__(self):
        return f"Imagen de {self.product.name}"


class Option(models.Model):
    class Meta:
        verbose_name = "opción"
        verbose_name_plural = "opciones"

    store = models.ForeignKey(
        Store, on_delete=models.CASCADE, related_name="options_store"
    )
    value = models.CharField(max_length=255, blank=False, null=False)
    created_at = models.DateTimeField(default=timezone.now)  # Campo para la fecha de creación


    def __str__(self):
        return self.value


class ProductOption(models.Model):
    class Meta:
        verbose_name = "opción de producto"
        verbose_name_plural = "opciones de productos"

    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="product_options"
    )
    option = models.ForeignKey(Option, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    sold = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    is_stock_low = models.BooleanField(default=False)
    low_stock_threshold = models.PositiveIntegerField(default=10)

    def __str__(self):
        return f"{self.product.name} - {self.option}"
    
    def check_stock_level(self):
        # Refrescar la instancia para obtener el valor actualizado de quantity
        self.refresh_from_db(fields=['quantity'])
        self.is_stock_low = self.quantity < self.low_stock_threshold
        self.save()

        # Obtener el producto asociado y actualizar el campo is_low_stock_alert si es necesario
        product = self.product
        if product.product_options.filter(is_stock_low=True).exists():
            product.is_low_stock_alert = True
        else:
            product.is_low_stock_alert = False
        product.save()
