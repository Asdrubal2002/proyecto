from django.db import models
from datetime import datetime
from apps.product_category.models import Category
from django.conf import settings
import uuid
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.store.models import Store


User = settings.AUTH_USER_MODEL
import os

# Create your models here.


def product_directory_path_store(instance, filename):
    # función para definir la ruta de almacenamiento de las imágenes
    # por ejemplo, "productos/{nombre_producto}/{filename}"
    return "productos/{0}/{1}".format(instance.product.name, filename)


class Product(models.Model):
    class Meta:
        verbose_name = "producto"
        verbose_name_plural = "productos"

    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.TextField(max_length=700, blank=True)
    # Elimina la línea de photo aquí, ya que se manejará en otro modelo
    slugProduct = models.SlugField(max_length=255, unique=True, default=uuid.uuid4)
    price = models.PositiveIntegerField(validators=[
        MinValueValidator(0),
        MaxValueValidator(1000000)  # Define el límite superior según tus necesidades
    ])
    tax = models.PositiveIntegerField(validators=[
        MinValueValidator(0),
        MaxValueValidator(1000000)  # Define el límite superior según tus necesidades
    ],default=0, blank=True)
    views = models.IntegerField(default=0, blank=True)
    quantity = models.IntegerField(default=0)
    sold = models.IntegerField(default=0)
    date_created = models.DateTimeField(default=datetime.now)
    is_active = models.BooleanField(default=True)
    likes = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, related_name="images", on_delete=models.CASCADE
    )
    photo = models.ImageField(upload_to=product_directory_path_store)
    # Puedes agregar campos adicionales si es necesario, como una descripción de la imagen

    def __str__(self):
        return f"Imagen de {self.product.name}"


class ViewCount(models.Model):
    product = models.ForeignKey(
        Product, related_name="post_view_count", on_delete=models.CASCADE
    )
    ip_address = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.ip_address}"


class Option(models.Model):
    class Meta:
        verbose_name = "opción"
        verbose_name_plural = "opciones"
    
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='options_store')
    value = models.CharField(max_length=255, blank=False, null=False)

    def __str__(self):
        return self.value
    

class ProductOption(models.Model):
    class Meta:
        verbose_name = "opción de producto"
        verbose_name_plural = "opciones de productos"

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_options')
    option = models.ForeignKey(Option, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    sold = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.product.name} - {self.option}"

