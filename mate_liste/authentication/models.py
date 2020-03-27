from django.db import models
from django.contrib.auth.models import AbstractUser
from decimal import Decimal

# Create your models here.
class CustomUser(AbstractUser):
    balance = models.DecimalField(max_digits=8, decimal_places=2, default=Decimal(0))

    def change_balance(self, amount):
        self.balance += Decimal(amount)