from django.urls import path
from .views import UserInvoicesAPIView, AddInvoiceAPIView, DeleteInvoiceAPIView

urlpatterns = [
    path('invoices', UserInvoicesAPIView.as_view(), name='user_invoices_api'),
    path('add_invoice', AddInvoiceAPIView.as_view(), name='add_invoice_api'),
    path('delete_invoice', DeleteInvoiceAPIView.as_view(), name='delete_invoice'),


    # Otras URLs de tu aplicación...
]
