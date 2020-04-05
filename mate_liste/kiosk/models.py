from django.db import models

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

    def buyProduct(user, product):
        if(user.balance < product.price):
            return False
        user.changeBalance(-product.price)
        return True
