from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializer import CategoriesStoreSerializer
from .models import Category
from apps.store.models import Store
from django.db.models import Q
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist



# Create your views here.

class ListCategoriesStoreView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, storeSlug, format=None):
        try:
            # Obtener la tienda por slug
            store = Store.objects.get(slug=storeSlug)
            categories = Category.objects.filter(store=store)
            result = []
            for category in categories:
                if not category.parent:
                    item = {}
                    item['id'] = category.id
                    item['name'] = category.name
                    item['slug'] = category.slug
                    
                    item['sub_categories'] = []
                    for cat in categories:
                        sub_item = {}
                        if cat.parent and cat.parent.id == category.id:
                            sub_item['id'] = cat.id
                            sub_item['name'] = cat.name
                            sub_item['slug'] = cat.slug
                            sub_item['sub_categories'] = []

                            item['sub_categories'].append(sub_item)
                    result.append(item)
            return Response({'categories': result}, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            # Manejar el caso en que la tienda no exista
            return JsonResponse({'error': 'Store not found'}, status=404)




   

