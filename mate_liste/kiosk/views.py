from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status

from .models import Product, Favorite, Transaction
from .serializers import ProductSerializer, FavoritesSerializer, FavoriteSerializer
from .serializers import TransactionGETSerializer, TransactionPOSTSerializer

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
    serializer_class = FavoritesSerializer

class TransactionListView(APIView):
    def get(self, request, format=None):
        transactions = Transaction.objects.all()
        serializer = TransactionGETSerializer(transactions, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TransactionPOSTSerializer(data=request.data)
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