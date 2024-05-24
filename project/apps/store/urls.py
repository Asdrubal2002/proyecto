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
    StorePolicyListByStoreAPIView,
    EditStoreView,
    StoreLikeDislikeAPIView,
    StoreLikesAPIView,
    LikedStoresAPIView,
    StoreUsersListView,
    AssociateUserToStoreAPIView,
    DeactivateSellerAPIView,
    RemoveAssociateAPIView,
    FAQRetrieveByStoreSlugAPIView
    
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
  
    path('policies/<store_slug>/', StorePolicyListByStoreAPIView.as_view(), name='store_policy_list_by_store'),

    path("edit-Store/", EditStoreView.as_view()),

    path('store/like_dislike/', StoreLikeDislikeAPIView.as_view(), name='product_like_dislike'),
    path('store/<storeSlug>/likes/', StoreLikesAPIView.as_view(), name='product-likes'),

    path('liked-stores', LikedStoresAPIView.as_view(), name='liked_stores'),
    path('store-partners/', StoreUsersListView.as_view(), name='store-users-list'),

    path('associate-user-to-store/', AssociateUserToStoreAPIView.as_view(), name='associate-user-to-store'),

    path('desactivate-seller/', DeactivateSellerAPIView.as_view(), name='desactivate-user-to-store'),
    path('remove-seller/', RemoveAssociateAPIView.as_view(), name='remove-user-to-store'),

    path('<store_slug>/faqs/', FAQRetrieveByStoreSlugAPIView.as_view(), name='faq-list-by-store-slug'),

]
