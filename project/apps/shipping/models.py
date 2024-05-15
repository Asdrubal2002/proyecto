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
    price = models.DecimalField(max_digits=20, decimal_places=2)  # Se cambia a DecimalField para permitir decimales personalizados
    additional_notes = models.CharField(max_length=200, blank=True, null=True)
    is_active = models.BooleanField(default=False)


    def __str__(self):
        return self.name

    @property
    def formatted_price(self):
        # Verificar si el envío tiene un país asociado
        if self.store.city.estado_o_departamento.pais.currency.decimal_places:
            # Obtener la cantidad de decimales de la moneda del país
            decimal_places = self.store.city.estado_o_departamento.pais.currency.decimal_places
            # Formatear el precio con separador de miles y decimales
            formatted_price = "{:,.{dp}f}".format(self.price, dp=decimal_places)
            return formatted_price
        else:
            return str(self.price)