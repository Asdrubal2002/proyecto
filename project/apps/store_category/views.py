from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from .models import Category


class ListCategoriesView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        categories = Category.objects.all()

        result = []

        for category in categories:
            item = {
                'id': category.id,
                'name': category.name,
                'slug': category.slug,
                'sub_categories': []  # Mantenemos la lista de subcategorías vacía por ahora
            }
            result.append(item)

        return Response({'categories': result}, status=status.HTTP_200_OK)