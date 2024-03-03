from django.contrib import admin

# Register your models here.

from django.contrib.auth import get_user_model
User = get_user_model()

class UserAdmin(admin.ModelAdmin):
    list_display = ('email','is_staff','is_superuser','is_active','last_login')
    list_display_links = ('email',)
    search_fields = ('email','is_staff','is_superuser','is_active','last_login')
    list_per_page = 25

admin.site.register(User, UserAdmin)