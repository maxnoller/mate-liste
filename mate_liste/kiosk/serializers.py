from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Product, Favorite

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
    class Meta:
        model = Favorite
        fields = '__all__'        

class FavoritesSerializer(serializers.ModelSerializer):
    favorites = serializers.PrimaryKeyRelatedField(many=True, queryset=Favorite.objects.all().order_by('position'))

    class Meta:
        model = User
        fields = ('favorites')