from django.urls import path
from .views import (
    view_user_carts,
    AddToCart,
    IncrementItemQuantity,
    DecrementItemQuantity,
    RemoveItemFromCart,
    SynchCartView,
    ProductsCartView,
    RemoveCartBySlug,
    ProductsCartViewStore,
    count_user_carts,
)

urlpatterns = [
    path("user_carts/", view_user_carts.as_view(), name="view_carritos_usuario"),
    path("count_user_carts/", count_user_carts.as_view(), name="count_carritos_usuario"),
    path("add_to_cart/", AddToCart.as_view(), name="add_to_cart"),
    path("<cart_slug>/products/", ProductsCartView.as_view(), name="selected_cart"),
    path(
        "increment_item_quantity/",
        IncrementItemQuantity.as_view(),
        name="increment_item_quantity",
    ),
    path(
        "decrement_item_quantity/",
        DecrementItemQuantity.as_view(),
        name="increment_item_quantity",
    ),
    path(
        "remove_item_from_cart/",
        RemoveItemFromCart.as_view(),
        name="remove_item_from_cart",
    ),
    path("remove_cart/", RemoveCartBySlug.as_view(), name="remove_item_from_cart"),
    path("sync_cart/", SynchCartView.as_view(), name="sync_cart"),
    path("cart/<store_slug>/", ProductsCartViewStore.as_view(), name="cart-detail"),
]
