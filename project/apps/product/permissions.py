from rest_framework import permissions

class CanEditProduct(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        user_store = request.user.stores.first()  # Asumiendo que el usuario está asociado a una única tienda

        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.category.store.user == user_store