from django.urls import path
from .views import GetShippingView, UserStoreShippingListView

urlpatterns = [
    path('shipping-options/<cart_slug>', GetShippingView.as_view(), name='get_store_shipping'),
    path('shipping-options-store/', UserStoreShippingListView.as_view(), name='get_store_my_shipping'),

    # Otras URL...
]