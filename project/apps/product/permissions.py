from rest_framework import permissions

class CanEditProduct(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.category.store.user == request.user