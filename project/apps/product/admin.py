from django.contrib import admin
from .models import Product, ProductImage, Option, ProductOption, Like

# Register your models here.

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'slugProduct', 'sold')
    list_display_links = ('id', 'name', 'category', 'slugProduct', 'sold')
    search_fields = ('name', 'category', 'slugProduct')
    list_per_page = 25

class ProductOptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'product','option', 'quantity', 'sold')
    list_display_links = ('id', 'product','option', 'quantity', 'sold')
    search_fields = ('id', 'product','option', 'quantity', 'sold')
    list_per_page = 25

class OptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'value')
    list_display_links = ('id', 'value')
    search_fields = ('id', 'value')
    list_per_page = 25

admin.site.register(Product, ProductAdmin)
admin.site.register(ProductOption, ProductOptionAdmin)

admin.site.register(ProductImage)
admin.site.register(Option, OptionAdmin)

admin.site.register(Like)










