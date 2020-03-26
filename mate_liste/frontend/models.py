from django.db import models
from django.contrib.auth.models import User
from kiosk.models import Product

# Create your models here.
class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    priority = models.IntegerField()

    def __str__(self):
        return "{}: {}({})".format(self.user, self.product, self.priority)