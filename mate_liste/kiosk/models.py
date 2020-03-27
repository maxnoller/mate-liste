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
    price = models.DecimalField(max_digits=4, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    barcode = models.CharField(max_length=128)

    def __str__(self):
        return self.name+": "+self.price.__str__()+"€"

    def buyProduct(user, product):
        if(user.balance < product.price):
            return False
        user.changeBalance(-product.price)
        return True
