from django.urls import path

from .views import EditProfilePhotoView

urlpatterns = [
    path("edit-profile-photo/", EditProfilePhotoView.as_view()),



]
