from django.urls import path, include
from rest_framework import renderers
from rest_framework.routers import DefaultRouter

from .views import ProductViewSet, KioskUserViewSet, FavoriteViewSet

router = DefaultRouter()
router.register(r'product', ProductViewSet)
router.register(r'user', KioskUserViewSet)
router.register(r'favorite', FavoriteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]