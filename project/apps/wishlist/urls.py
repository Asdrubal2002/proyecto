from django.urls import path
from .views import WishListView,AddToWishListView,WishListStoresView,AddToWishListStoreView

urlpatterns = [
    path('user_wish_list', WishListView.as_view(), name='view_lista_productos_usuario'),
    path('add-to-wishlist/', AddToWishListView.as_view(), name='add_to_wishlist'),
    path('user_wish_list_stores', WishListStoresView.as_view(), name='view_lista_stores_usuario'),
    path('add-store-to-wishlist/', AddToWishListStoreView.as_view(), name='add_store_to_wishlist'),




]
