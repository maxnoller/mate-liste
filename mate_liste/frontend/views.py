from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseForbidden
from django.http import HttpResponseBadRequest
from django.contrib.auth.decorators import login_required
from kiosk.models import Product
from finances.models import Account
from .models import Favorite

def index(request):
    """Function view responsible for handling index page"""
    #if request.user.is_authenticated:
    #    context = {'balance': Account.objects.get(user=request.user).balance,
    #               'favorites': Favorite.objects.filter(user=request.user).order_by('priority')}
    #    return render(request, "index.html", context)
    context = {}
    return render(request, "index.html", context)

@login_required(redirect_field_name='next', login_url='/login')
def scan(request):
    """Function view responsible for handling scan page"""
    return render(request, "scan.html", {})

def buy_products_view(request):
    """Function view which provides functionality to buy a product"""
    if not request.GET:
        return HttpResponseBadRequest("Please pass products as get request")
    if not request.user:
        return HttpResponseForbidden("Only possible when logged in")
    products = parse_product_string(request.GET.get('products'))
    for product in products:
        Product.buyProduct(request.user, product)
    return HttpResponse("Success")

def get_cart_view(request):
    """Function wview which provides renderer cart html for given products"""
    if not request.GET:
        return HttpResponseBadRequest("Please pass products as get request")
    products = parse_product_string(request.GET.get('products'))
    return render(request, "cart.html", {"products":products})

def parse_product_string(string):
    """Function which parses a string containing barcodes seppererated by
       underscores into a list of barcodes"""
    products = []
    for product_string in string.split('_'):
        products.append(Product.objects.get(barcode=product_string))
    return products
