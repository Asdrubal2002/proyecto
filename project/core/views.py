from rest_framework.views import APIView
from rest_framework.response import Response
from apps.user.models import UserAccount
from apps.store.models import Store
from apps.invoice.models import Invoice


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