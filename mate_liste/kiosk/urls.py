from django.urls import path, include
from rest_framework import renderers
from rest_framework.routers import DefaultRouter

from .views import ProductViewSet, KioskUserViewSet

router = DefaultRouter()
router.register(r'product', ProductViewSet)
router.register(r'user', KioskUserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]