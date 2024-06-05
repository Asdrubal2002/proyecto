from django.urls import path
from .views import (
    UserInvoicesAPIView,
    AddInvoiceAPIView,
    DeleteInvoiceAPIView,
    InvoiceListAPIView,
    InvoiceStatusListAPIView,
    InvoiceDetailAPIView,
    UserCountInvoicesAPIView,
)

urlpatterns = [
    path("invoices", UserInvoicesAPIView.as_view(), name="user_invoices_api"),
    path("invoices_count", UserCountInvoicesAPIView.as_view(), name="user_invoices_api_count"),

    path("add_invoice", AddInvoiceAPIView.as_view(), name="add_invoice_api"),
    path("delete_invoice", DeleteInvoiceAPIView.as_view(), name="delete_invoice"),
    path("admin-invoices", InvoiceListAPIView.as_view(), name="invoice-list"),
    path(
        "invoice-status", InvoiceStatusListAPIView.as_view(), name="invoice_status_list"
    ),
    path(
        "invoice-detail/<transaction_number>",
        InvoiceDetailAPIView.as_view(),
        name="invoice-detail",
    ),
    # Otras URLs de tu aplicación...
]
