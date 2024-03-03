from django.contrib import admin
from .models import Pais, EstadoODepartamento, Ciudad

from import_export import resources
from import_export.admin import ImportExportModelAdmin

class paisResource(resources.ModelResource):
    class Meta:
        model = Pais
        
class PaisonAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = ['nombre']
    resource_class = paisResource

admin.site.register(Pais, PaisonAdmin)

class estadoResource(resources.ModelResource):
    class Meta:
        model = EstadoODepartamento

class EstadoAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    search_fields = ['nombre']
    resource_class = estadoResource

admin.site.register(EstadoODepartamento, EstadoAdmin)


class cityResource(resources.ModelResource):
    class Meta:
        model = Ciudad

class CiudadAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('id','nombre')
    list_display_links = ('id','nombre')
    search_fields = ('nombre',)
    list_per_page = 25

admin.site.register(Ciudad, CiudadAdmin)


