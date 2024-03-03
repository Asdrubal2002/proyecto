from django.urls import path
from .views import AllTheCitiesView

urlpatterns = [
    path('cities', AllTheCitiesView.as_view()),
 
]