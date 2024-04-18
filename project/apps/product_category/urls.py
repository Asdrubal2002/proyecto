from django.urls import path
from .views import (
    ListCategoriesStoreView,
    CategoryListViewAdmin,
    CreateCategoryAPIView,
    CategoryDeleteAPIView,
    CategoryStateAPIView,
    EditCategoryView,
)


urlpatterns = [
    path("categories_store/<storeSlug>", ListCategoriesStoreView.as_view()),
    path("categories_products/", CategoryListViewAdmin.as_view()),
    path("create_categories_products/", CreateCategoryAPIView.as_view()),
    path(
        "eliminar_categoria/<int:category_id>/",
        CategoryDeleteAPIView.as_view(),
        name="eliminar_categoria",
    ),
    path(
        "estado_categoria/",
        CategoryStateAPIView.as_view(),
        name="cambiar_estado_categoria",
    ),
    path("update_categories_products/", EditCategoryView.as_view()),
]
