from django.shortcuts import render
from django.http import HttpResponse
from kiosk.models import Product

# Create your views here.
def index(request):
    return render(request, "base.html", {})

def scan(request):
    return render(request, "scan.html", {})

def buyProducts(request):
    if not request.GET:
        return HttpResponse("Please pass products as get request")
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