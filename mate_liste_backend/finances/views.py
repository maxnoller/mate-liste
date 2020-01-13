from django.shortcuts import render
from .models import Account
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from kiosk.models import Product

@login_required(redirect_field_name='next', login_url='/login')
def lowerMoneyByOne(request):
    Product.buyProduct(request.user, Product.objects.get(name="Club Mate"))
    return HttpResponse("Maaaate")