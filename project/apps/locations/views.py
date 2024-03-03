from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Ciudad
from .serializers import CiudadSerializer
from rest_framework import permissions, status

# Create your views here.

class AllTheCitiesView(APIView):
    def get(self, request):
        ciudades = Ciudad.objects.all()
        serializer = CiudadSerializer(ciudades, many=True)
        return Response({'cities': serializer.data}, status=status.HTTP_200_OK)
