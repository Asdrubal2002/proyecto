from django.db import models

# Create your models here.

class Currency(models.Model):
    class Meta:
        verbose_name = "currency"
        verbose_name_plural = "currencies"

    typecurrency = models.CharField(max_length=3)
    name = models.CharField(max_length=50)
    decimal_places = models.IntegerField(default=3)  # Nuevo campo para almacenar la cantidad de decimales


    def __str__(self):
        return self.typecurrency
