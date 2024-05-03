from django.urls import path
from .views import (
    StoreDetailview,
    ListStoresView,
    ListSearchView,
    ListRelatedView,
    ListStoreByCategoryView,
    CreateStoreAPIView,
    UserStoreAPIView,
    EditStoreLogoView,
    EditStoreBannerView,

    StorePolicyCreateAPIView,
    StorePolicyUpdateAPIView,
    StorePolicyDeleteAPIView,
    StorePolicyListByStoreAPIView,

    
)

urlpatterns = [
    path("store/<storeSlug>", StoreDetailview.as_view()),
    path("get-stores", ListStoresView.as_view()),
    path("search", ListSearchView.as_view()),
    path("by_category", ListStoreByCategoryView.as_view()),
    path("create-store/", CreateStoreAPIView.as_view(), name="crear_tienda_api"),
    path("user-store/", UserStoreAPIView.as_view(), name="user-store"),

    path("edit-Store-photo/", EditStoreLogoView.as_view()),
    path("edit-Store-banner/", EditStoreBannerView.as_view()),

    path('policies-create/', StorePolicyCreateAPIView.as_view(), name='store_policy_create'),
    path('policies/update/<int:pk>/', StorePolicyUpdateAPIView.as_view(), name='store_policy_update'),
    path('policies/delete/<int:pk>/', StorePolicyDeleteAPIView.as_view(), name='store_policy_delete'),
    path('policies/<store_slug>/', StorePolicyListByStoreAPIView.as_view(), name='store_policy_list_by_store'),

]
