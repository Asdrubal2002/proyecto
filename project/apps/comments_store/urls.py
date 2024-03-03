from django.urls import path
from .views import ComentStoreAPIView,AddCommentStoreView,ComentDeleteAPIView, ComentUpdateAPIView

urlpatterns = [
    path('<store_slug>', ComentStoreAPIView.as_view(), name='comentarios-tienda'),
    path('create-comment/', AddCommentStoreView.as_view(), name='create_comment'),
    path('delete_comment/<int:pk>/', ComentDeleteAPIView.as_view(), name='delete_comment'),
    path('update_comment/<int:pk>/', ComentUpdateAPIView.as_view(), name='update_comment'),



]