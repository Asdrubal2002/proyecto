from django.shortcuts import render
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from django.core.files.storage import default_storage
from rest_framework.response import Response

# Create your views here.

class EditProfilePhotoView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data

        # Verificar si hay una foto en los datos recibidos
        if 'photo' in data:
            photo = data['photo']

            # Si el usuario ya tiene una foto, elimínala
            if user.photo:
                user.photo.delete()

            # Guardar la nueva foto en el campo 'photo' del usuario
            user.photo = photo
            user.save()

            return Response({"success": "Photo uploaded successfully"})
        else:
            return Response({"error": "Photo image is required"})