from rest_framework import serializers
from .models import Pais, EstadoODepartamento, Ciudad
from apps.currency.serlializer import CurrencySerializer

class PaisSerializer(serializers.ModelSerializer):
    currency=CurrencySerializer()
    class Meta:
        model = Pais
        fields = ['id', 'nombre','currency']

class EstadoODepartamentoSerializer(serializers.ModelSerializer):
    pais=PaisSerializer()
    class Meta:
        model = EstadoODepartamento
        fields = ['id', 'nombre', 'pais']

class CiudadSerializer(serializers.ModelSerializer):
    estado_o_departamento=EstadoODepartamentoSerializer()
    class Meta:
        model = Ciudad
        fields = ['id', 'nombre', 'estado_o_departamento']