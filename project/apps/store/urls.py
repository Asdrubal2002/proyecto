from django.urls import path
from .views import StoreDetailview, ListStoresView, ListSearchView, ListRelatedView, ListStoreByCategoryView,CreateStoreAPIView, UserStoreAPIView

urlpatterns = [
    path('store/<storeSlug>', StoreDetailview.as_view()),
    path('get-stores', ListStoresView.as_view()),
    path('search', ListSearchView.as_view()),
    path('by_category',ListStoreByCategoryView.as_view()),

    path('create-store/', CreateStoreAPIView.as_view(), name='crear_tienda_api'),
    path('user-store/', UserStoreAPIView.as_view(), name='user-store'),



]
