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
    
