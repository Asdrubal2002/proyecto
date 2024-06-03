from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Ciudad, Pais
from .serializers import CiudadSerializer, PaisSerializer
from rest_framework import permissions, status

# Create your views here.
class AllTheCitiesView(APIView):
    def get(self, request):
        ciudades = Ciudad.objects.all()
        paises = Pais.objects.all()

        ciudad_serializer = CiudadSerializer(ciudades, many=True)
        pais_serializer = PaisSerializer(paises, many=True)

        response_data = {
            'cities': ciudad_serializer.data,
            'countries': pais_serializer.data,
        }

        return Response(response_data, status=status.HTTP_200_OK)