from django.urls import path
from . import views

urlpatterns = [
    path("low", views.lowerMoneyByOne),
    ]
