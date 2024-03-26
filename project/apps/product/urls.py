from django.urls import path
from .views import (
    ListProductsByCategoryView,
    ProductsByStore,
    SearchProductInView,
    ProductDetailView,
    ProductOptionListView,
    OptionListView,
    CreateOptionAPIView,
    UserProductsAPIView,
    EditProductView
)

urlpatterns = [
    path("product/<storeSlug>/<categorySlug>", ListProductsByCategoryView.as_view()),
    path("products/<storeSlug>", ProductsByStore.as_view()),
    path("search", SearchProductInView.as_view(), name="search_in_store_category"),
    path("detail/<slugProduct>", ProductDetailView.as_view()),
    path(
        "options/<product_slug>",
        ProductOptionListView.as_view(),
        name="product-options-list",
    ),
    path("options/", OptionListView.as_view()),
    path("create-option/", CreateOptionAPIView.as_view()),
    path("user-products/", UserProductsAPIView.as_view(), name="user_products"),

    path("edit-product/", EditProductView.as_view()),



]
