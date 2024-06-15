from rest_framework.views import APIView
from rest_framework.response import Response
from apps.user.models import UserAccount
from apps.store.models import Store
from apps.invoice.models import Invoice
from apps.user.models import UserAccount
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken, UntypedToken
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework import permissions, status


class TotalAPIView(APIView):
    def get(self, request, format=None):
        total_tiendas = Store.objects.count()
        total_usuarios = UserAccount.objects.count()
        total_facturas = Invoice.objects.count()

        data = {
            'total_tiendas': total_tiendas,
            'total_usuarios': total_usuarios,
            'total_facturas': total_facturas,
        }

        return Response(data)
    

class SellerLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email', None)
        password = request.data.get('password', None)

        if email is None or password is None:
            return Response({'error': 'Por favor, proporcione tanto el correo electrónico como la contraseña'}, status=status.HTTP_400_BAD_REQUEST)

        user = UserAccount.objects.filter(email=email).first()

        if user is None:
            # No user found with the provided email
            return Response({'error': 'Correo electrónico o contraseña no válidos'}, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_seller:
            # User is not a seller
            return Response({'error': 'El usuario no es un vendedor'}, status=status.HTTP_403_FORBIDDEN)

        if not user.check_password(password):
            # Increment failed login attempts
            user.failed_login_attempts += 1
            user.save()
            if user.failed_login_attempts >= 3:
                user.is_active = False
                user.save()
                return Response({'error': 'Su cuenta ha sido bloqueada debido a múltiples intentos fallidos de inicio de sesión'}, status=status.HTTP_401_UNAUTHORIZED)
            return Response({'error': 'Correo electrónico o contraseña no válidos'}, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_active:
            return Response({'error': 'Su cuenta ha sido bloqueada debido a múltiples intentos fallidos de inicio de sesión.'}, status=status.HTTP_403_FORBIDDEN)

        # Reset failed login attempts on successful login
        user.failed_login_attempts = 0
        user.save()

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })