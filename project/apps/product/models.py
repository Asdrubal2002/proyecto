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
    tax = models.DecimalField(max_digits=20, decimal_places=2, default=0, blank=True)
    sold = models.IntegerField(default=0)
    date_created = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=False)
    
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

    def __str__(self):
        return f"{self.product.name} - {self.option}"
