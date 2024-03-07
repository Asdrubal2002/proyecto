from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from .views import TotalAPIView, SellerLoginView


urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    
    path('api/profile/', include('apps.user_profile.urls')),

    path('api/store_category/', include('apps.store_category.urls')),
    
    path('api/store/', include('apps.store.urls')),

    path('api/product_category/', include('apps.product_category.urls')),

    path('api/product/', include('apps.product.urls')),

    path('api/cart/', include('apps.cart.urls')),

    path('api/shipping/', include('apps.shipping.urls')),

    path('api/cities/', include('apps.locations.urls')),

    path('api/wishlist/', include('apps.wishlist.urls')),

    path('api/coments_store/', include('apps.comments_store.urls')),

    path('api/invoice/', include('apps.invoice.urls')),

    path('api/coments_product/', include('apps.comments_product.urls')),


    path('total/', TotalAPIView.as_view(), name='panel_de_control_api'),

    path('seller/login/', SellerLoginView.as_view(), name='seller_login'),

    path('admin/', admin.site.urls),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*',
    TemplateView.as_view(template_name='index.html'))]
