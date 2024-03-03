from django.urls import path
from .views import ListCategoriesStoreView


urlpatterns = [
    path('categories_store/<storeSlug>', ListCategoriesStoreView.as_view()),


]