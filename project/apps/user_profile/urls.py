from django.urls import path
from .views import GetUserProfileView, UpdateUserProfileView, GetUserProfileLocationView, UpdateUserLocationView

urlpatterns = [
    path('user', GetUserProfileView.as_view()),
    path('update', UpdateUserProfileView.as_view()),
    path('user_location', GetUserProfileLocationView.as_view()),
    path('update_user_location', UpdateUserLocationView.as_view()),


]
