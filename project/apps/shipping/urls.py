from django.urls import path
from .views import (
    GetShippingView,
    UserStoreShippingListView,
    UserAddStoreShippingListView,
    ShippingDeleteAPIView,
    ShippingStateAPIView,
    EditShippingView,
)

urlpatterns = [
    path(
        "shipping-options/<cart_slug>",
        GetShippingView.as_view(),
        name="get_store_shipping",
    ),
    path(
        "shipping-options-store/",
        UserStoreShippingListView.as_view(),
        name="get_store_my_shipping",
    ),
    path(
        "add_shipping-options-store/",
        UserAddStoreShippingListView.as_view(),
        name="add_store_my_shipping",
    ),
    path(
        "delete_shipping/<int:shipping_id>/",
        ShippingDeleteAPIView.as_view(),
        name="eliminar_shipping",
    ),
    path(
        "estado_shipping/",
        ShippingStateAPIView.as_view(),
        name="cambiar_estado_envio",
    ),
    path("update_shippings/", EditShippingView.as_view()),
    # Otras URL...
]
