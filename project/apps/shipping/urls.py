from django.urls import path
from .views import GetShippingView

urlpatterns = [
    path('shipping-options/<cart_slug>', GetShippingView.as_view(), name='get_store_shipping'),
    # Otras URL...
]