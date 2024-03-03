from django.urls import path
from .views import UserInvoicesAPIView, AddInvoiceAPIView

urlpatterns = [
    path('invoices', UserInvoicesAPIView.as_view(), name='user_invoices_api'),
    path('add_invoice', AddInvoiceAPIView.as_view(), name='add_invoice_api'),


    # Otras URLs de tu aplicación...
]
