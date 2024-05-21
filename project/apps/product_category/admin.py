from django.contrib import admin
from .models import Category
# Register your models here.

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'store', 'slug')
    list_display_links = ('id','name', 'store')
    search_fields = ('name', 'store', 'slug')
    list_per_page = 25

admin.site.register(Category, CategoryAdmin)