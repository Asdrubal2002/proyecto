from django.shortcuts import render
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from django.core.files.storage import default_storage
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import permissions
from django.contrib.auth import authenticate, login
from rest_framework import status
from .models import UserAccount

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



class CustomLoginView(APIView):
    permission_classes = (permissions.AllowAny,)  

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Both email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, email=email, password=password)

        if user is None:
            # Obtener o crear el usuario según el correo electrónico proporcionado
            user, _ = UserAccount.objects.get_or_create(email=email, defaults={'username': email})
                # Incrementar el contador de intentos de inicio de sesión fallidos
            user.failed_login_attempts += 1
            user.save()
            # Bloquear la cuenta si excede el límite de intentos de inicio de sesión
            if user.failed_login_attempts >= 3:
                user.is_active = False
                user.save()
                return Response({'error': 'Your account has been blocked due to multiple failed login attempts'}, status=status.HTTP_401_UNAUTHORIZED)
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

        # Restablecer el contador de intentos de inicio de sesión fallidos si la autenticación es exitosa
        user.failed_login_attempts = 0
        user.save()

        login(request, user)  # Iniciar sesión en el usuario
        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })