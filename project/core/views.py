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
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email', None)
        password = request.data.get('password', None)

        if email is None or password is None:
            return Response({'error': 'Please provide both email and password'}, status=status.HTTP_400_BAD_REQUEST)

        user = UserAccount.objects.filter(email=email, is_seller=True).first()

        if user is None or not user.check_password(password):
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    
class CustomMeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        # Personaliza la respuesta según tus necesidades
        data = {
            'email': user.email,
            'is_seller': user.is_seller,
            # Agrega más campos si es necesario
        }
        return Response(data)
    

class CustomSellerRefresh(APIView):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        user = request.user

        # Verificar si el usuario es vendedor
        if user.is_authenticated and user.is_seller:
            refresh = RefreshToken.for_user(user)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)


class CustomSellerVerify(APIView):
    def post(self, request, *args, **kwargs):
        token = request.data.get('token', None)

        if token is None:
            return Response({'error': 'Token not provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            untyped_token = UntypedToken(token)
            untyped_token.payload['is_seller'] = True  # Agregar campo is_seller al payload del token
            AccessToken(token)  # Verificar la validez del token

            return Response({'detail': 'Token is valid'}, status=status.HTTP_200_OK)
        except InvalidToken:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)










