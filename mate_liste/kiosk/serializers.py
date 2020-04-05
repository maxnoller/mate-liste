from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    price = serializers.DecimalField(max_digits=4, decimal_places=2)
    image = serializers.ImageField()

    def create(self, **validated_data):
        return Product.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.name
        instance.price = validated_data.price
        instance.image = validated_data.image
        instance.save()
        return instance