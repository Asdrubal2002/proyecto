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
    EditProductView,
    StatusProductView,
    DeleteProductView,
    DeletePhotoProductView,
    EditProductPhotosView,
    CreateProductView,
    ProductOptionsView,
    DeleteProductOptionView,
    ListProductsByCategoryViewAdmin,
    CreateOptionsAPIView,
    OptionListAdminAPIView,
    ProductLikeDislikeAPIView,
    ProductLikesAPIView,
    LikedProductsAPIView
)

urlpatterns = [
    path("product/<storeSlug>/<categorySlug>", ListProductsByCategoryView.as_view()),
    path("products/<storeSlug>", ProductsByStore.as_view()),
    path("search", SearchProductInView.as_view(), name="search_in_store_category"),
    path("detail/<slugProduct>", ProductDetailView.as_view()),
    path("options/<product_slug>",ProductOptionListView.as_view(),name="product-options-list"),
    path("options/", OptionListView.as_view()),
    path("create-option/", CreateOptionAPIView.as_view()),
    path("user-products/", UserProductsAPIView.as_view(), name="user_products"),
    path("edit-product/", EditProductView.as_view()),
    path("edit-product-status/", StatusProductView.as_view()),
    path("delete/<slug>", DeleteProductView.as_view()),
    path("delete-photo/<id>", DeletePhotoProductView.as_view()),
    path("edit-product-photo/", EditProductPhotosView.as_view()),
    path("create-product/", CreateProductView.as_view()),
    path("options-product-admin/<slug>", ProductOptionsView.as_view()),
    path("delete-option/<option_id>", DeleteProductOptionView.as_view()),
    path("product-admin/<storeSlug>/<categorySlug>", ListProductsByCategoryViewAdmin.as_view()),
    path("create-options-admin/", CreateOptionsAPIView.as_view()),
    path("user-admin-options-view/", OptionListAdminAPIView.as_view(), name="user_admin_products"),
    path('product/like_dislike/', ProductLikeDislikeAPIView.as_view(), name='product_like_dislike'),
    path('product/<slugProduct>/likes/', ProductLikesAPIView.as_view(), name='product-likes'),

    path('liked-products', LikedProductsAPIView.as_view(), name='liked-products'),



]
