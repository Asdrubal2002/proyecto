from django.db import models
from apps.store.models import Store
from django.core.validators import MinValueValidator, MaxValueValidator


class Shipping(models.Model):
    class Meta:
        verbose_name = 'Shipping'
        verbose_name_plural = 'Shipping'

    name = models.CharField(max_length=255)
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='shipping_store')
    time_to_delivery = models.CharField(max_length=255)
    price = models.PositiveIntegerField(validators=[
        MinValueValidator(0),
        MaxValueValidator(1000000)  # Define el límite superior según tus necesidades
    ])    
    additional_notes = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.name