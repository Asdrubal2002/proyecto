from django.urls import path

from .views import EditProfilePhotoView, CustomLoginView

urlpatterns = [
    path("edit-profile-photo/", EditProfilePhotoView.as_view()),
    path('autenticar/', CustomLoginView.as_view(), name='custom_login'),




]
