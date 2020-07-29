from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Product, Favorite, Transaction

User = get_user_model()

class ProductSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=255)
    price = serializers.DecimalField(max_digits=8, decimal_places=2)
    image = serializers.ImageField()

    def create(self, **validated_data):
        return Product.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.name
        instance.price = validated_data.price
        instance.image = validated_data.image
        instance.save()
        return instance

class FavoriteSerializer(serializers.ModelSerializer):
    product = ProductSerializer(many=False)
    
    class Meta:
        model = Favorite
        fields = ("id", "user", "product")
        read_only_fields = ("position",)

class FavoritesSerializer(serializers.ModelSerializer):
    favorites = FavoriteSerializer(many=True)

    class Meta:
        model = User
        fields = ('favorites',)

class TransactionGETSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    product = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    time = serializers.DateTimeField()
    success = serializers.BooleanField()

    class Meta:
        model = Transaction
        fields = ('id', 'user', 'product', 'time', 'success')

class TransactionPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('product','user')
        read_only_fields = ('time', 'success', 'id')