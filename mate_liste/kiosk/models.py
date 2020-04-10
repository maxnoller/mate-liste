from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name
    class Meta:
        verbose_name_plural = "Categories"

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=4, decimal_places=2, default=0)
    image = models.ImageField(upload_to="images/products/", default="images/products/default.png")

    def __str__(self):
        return self.name+": "+self.price.__str__()+"€"

    def buyProduct(self ,user ,product):
        if(user.balance < product.price):
            return False
        user.changeBalance(-product.price)
        return True

user_model = get_user_model()

# Create your models here.
class Favorite(models.Model):
    user = models.ForeignKey(user_model, on_delete=models.CASCADE, related_name="favorites")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    position = models.IntegerField()

    def __str__(self):
        return "{}: {}({})".format(self.user, self.product, self.position)