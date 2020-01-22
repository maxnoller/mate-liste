from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("scan", views.scan, name="scanProduct"),
    path("getCart", views.getCart, name="getCart"),
    path("buyProducts", views.buyProducts, name="buyProducts"),
    path("logout", views.logout_view, name="logout"),
    ]
