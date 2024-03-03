from django.urls import path
from .views import ComentProductAPIView, AddCommentProductView, ComentDeleteAPIView, ComentUpdateAPIView


urlpatterns = [
    path('<product_slug>', ComentProductAPIView.as_view(), name='comentarios-producto'),
    path('create-comment/', AddCommentProductView.as_view(), name='create_comment'),
    path('delete_comment/<int:pk>/', ComentDeleteAPIView.as_view(), name='delete_comment'),
    path('update_comment/<int:pk>/', ComentUpdateAPIView.as_view(), name='update_comment'),

]