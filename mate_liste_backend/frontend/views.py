from django.shortcuts import render
from django.http import HttpResponse
from kiosk.models import Product
from django.contrib.auth.decorators import login_required

# Create your views here.
def index(request):
    return render(request, "base.html", {})

@login_required(redirect_field_name='next', login_url='/login')
def scan(request):
    return render(request, "scan.html", {})

def buyProducts(request):
    if not request.GET:
        return HttpResponse("Please pass products as get request")
    if not request.user:
        return HttpResponse("Only possible when logged in")
    products = parseProductString(request.GET.get('products'))
    for product in products:
        Product.buyProduct(request.user, product)
    return HttpResponse("Success")

def getCart(request):
    if not request.GET:
        return HttpResponse("Please pass products as get request")
    products = parseProductString(request.GET.get('products'))
    return render(request, "cart.html", {"products":products})

def parseProductString(string):
    products = []
    for productString in string.split('_'):
        products.append(Product.objects.get(barcode=productString))
    return products