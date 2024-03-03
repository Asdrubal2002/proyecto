from django.contrib import admin
from .models import Invoice, InvoiceStatus

from import_export import resources
from import_export.admin import ImportExportModelAdmin

# Register your models here.

class estatusResource(resources.ModelResource):
    class Meta:
        model = InvoiceStatus

class EstadoAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = estatusResource

admin.site.register(InvoiceStatus, EstadoAdmin)

class InvoiceAdmin(admin.ModelAdmin):
    list_display = ['id', 'buyer', 'store', 'total_amount', 'status']  # Campos que se mostrarán en la lista de facturas
    list_filter = ['status']  # Filtros disponibles en la lista de facturas
    search_fields = ['buyer__first_name', 'buyer__last_name']  # Campos por los cuales se puede buscar en la lista de facturas
    readonly_fields = ['transaction_number']  # Campos que son de solo lectura en el admin

admin.site.register(Invoice, InvoiceAdmin)

