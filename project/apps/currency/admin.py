from django.contrib import admin

from import_export import resources
from import_export.admin import ImportExportModelAdmin

from .models import Currency

# Register your models here.

class currencyResource(resources.ModelResource):
    class Meta:
        model = Currency


class CurrencyAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = ['name']
    resource_class = currencyResource
    list_display = ('id','typecurrency', 'name')

admin.site.register(Currency,CurrencyAdmin)
