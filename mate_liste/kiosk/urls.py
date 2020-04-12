from django.urls import path, include
from rest_framework import renderers
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

from .views import ProductViewSet, KioskUserViewSet, FavoriteViewSet
from .views import TransactionDetailView, TransactionListView

router = DefaultRouter()
router.register(r'product', ProductViewSet)
router.register(r'user', KioskUserViewSet)
router.register(r'favorite', FavoriteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

suffixpatterns = [
    path('transaction/', TransactionListView.as_view()),
    path('transaction/<int:pk>/', TransactionDetailView.as_view())
]

urlpatterns = urlpatterns + format_suffix_patterns(suffixpatterns)