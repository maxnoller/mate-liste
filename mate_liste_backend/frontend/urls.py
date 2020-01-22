from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("scan", views.scan, name="scanProduct"),
    path("getCart", views.getCart, name="getCart"),
    path("buyProduct", views.buyProduct, name="buyProduct"),
    ]
