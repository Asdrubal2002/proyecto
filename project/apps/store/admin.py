from django.contrib import admin
from .models import Store


# Register your models here.

class StoreAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'slug')
    list_display_links = ('id','name', 'slug')
    search_fields = ('name', 'slug')
    list_per_page = 25

admin.site.register(Store, StoreAdmin)

