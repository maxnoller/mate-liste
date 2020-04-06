from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth import get_user_model

from .models import Product, Favorite
from .serializers import ProductSerializer, KioskUserSerializer, FavoriteSerializer

User = get_user_model()

# Create your views here.
class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class FavoriteViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer

class KioskUserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = KioskUserSerializer