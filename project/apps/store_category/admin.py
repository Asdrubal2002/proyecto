from django.contrib import admin
from .models import Category

from import_export import resources
from import_export.admin import ImportExportModelAdmin

# Register your models here.

class categoryStoresResource(resources.ModelResource):
    class Meta:
        model = Category

class CategoriesStoresAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = ['name']
    resource_class = categoryStoresResource
    list_display = ('id','name')
    list_per_page = 25

admin.site.register(Category,CategoriesStoresAdmin)

