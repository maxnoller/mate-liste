from django.db import models
from django.contrib.auth import get_user_model
from kiosk.models import Product

user_model = get_user_model()

# Create your models here.
class Favorite(models.Model):
    user = models.ForeignKey(user_model, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    priority = models.IntegerField()

    def __str__(self):
        return "{}: {}({})".format(self.user, self.product, self.priority)