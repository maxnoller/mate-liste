from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from decimal import Decimal

# Create your models here.
class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, db_constraint=False)
    balance = models.DecimalField(max_digits=6, decimal_places=2, help_text="Defines how much money a student has on his account")
    
    def chargeAmount(self, amount):
        self.balance -= Decimal(amount)
        self.save()

    def loadAmount(self, amount):
        self.balance += Decimal(amount)
        self.save()
        
    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_user_account(sender, instance, created, **kwargs):
    if created:
        Account.objects.create(user=instance, balance=0)
    
@receiver(post_save, sender=User)
def save_user_account(sender, instance, **kwargs):
    instance.account.save()