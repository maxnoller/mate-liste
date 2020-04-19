import jwt
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from rest_framework.decorators import action

from .models import Product, Favorite, Transaction
from .serializers import ProductSerializer, FavoritesSerializer, FavoriteSerializer
from .serializers import TransactionGETSerializer, TransactionPOSTSerializer
from .permissions import IsAdminOrSelf

User = get_user_model()

# Create your views here.
class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class FavoriteViewSet(viewsets.ModelViewSet):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer

    @action(detail=True, methods=['post'], permission_classes=[IsAdminOrSelf])
    def create_favorite(self, request, pk=None):
        print("creating favorite")
        serializer = FavoriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserFavoriteDetailView(APIView):
    def get(self, request, pk, format=None):
        queryset = User.objects.get(id=pk)
        serializer = FavoritesSerializer(queryset, many=False)
        return Response(serializer.data)

class TransactionListView(APIView):
    def get(self, request, format=None):
        transactions = Transaction.objects.all()
        serializer = TransactionGETSerializer(transactions, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        data = request.data
        data["user"] = jwt.decode(request.META['HTTP_AUTHORIZATION'][4:], settings.SECRET_KEY, algorithms=['HS256'])['user_id']
        serializer = TransactionPOSTSerializer(data=data)
        if serializer.is_valid():
            transaction = serializer.save() 
            transaction.complete_transaction()
            return Response(TransactionGETSerializer(transaction).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TransactionDetailView(APIView):
    def get_object(self, pk):
        try:
            return Transaction.objects.get(pk=pk)
        except Transaction.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        transaction = self.get_object(pk)
        serializer = TransactionGETSerializer(transaction)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        transaction = self.get_object(pk)
        serializer = TransactionGETSerializer(transaction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)