from django.db import models
from django.contrib.auth import get_user_model

user_model = get_user_model()

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
    image = models.ImageField(upload_to="product_images/", default="default.png")

    def __str__(self):
        return self.name+": "+self.price.__str__()+"€"

class Favorite(models.Model):
    user = models.ForeignKey(user_model, on_delete=models.CASCADE, related_name="favorites")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    position = models.IntegerField(default=0)

    def nrof_times_bought(self):
        queryset = Transaction.objects.filter(user=self.user, product=self.product, success=True)
        return len(queryset)

    def __str__(self):
        return "{}: {}({})".format(self.user, self.product, self.position)

class Transaction(models.Model):
    user = models.ForeignKey(user_model, on_delete=models.CASCADE, related_name="transactions")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now=True)
    success = models.BooleanField(default=False)

    def check_viability(self):
        if(self.product.price <= self.user.balance):
            print("viable")
            return True
        return False

    def complete_transaction(self):
        if(self.check_viability()):
            self.user.balance -= self.product.price
            self.user.save()
            print("completing transaction")
            self.success = True
            self.save()
            return True
        self.success = False
        self.save()
        return False

    def __str__(self):
        if(self.success):
            return "{} bought {}({}€) at {}".format(self.user, self.product, self.product.price, self.time)
        else:
            return "{} failed to buy {}({}€) at {}".format(self.user, self.product, self.product.price, self.time)