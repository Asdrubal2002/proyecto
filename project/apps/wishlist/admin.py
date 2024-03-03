from django.contrib import admin

# Register your models here.

from .models import WishList, WishListStore

admin.site.register(WishList)
admin.site.register(WishListStore)
