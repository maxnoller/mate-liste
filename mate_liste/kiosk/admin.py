from django.contrib import admin
from .models import Category, Product, Favorite
from .models import Transaction
# Register your models here.
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Favorite)
admin.site.register(Transaction)