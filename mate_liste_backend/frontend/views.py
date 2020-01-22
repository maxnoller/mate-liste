from django.shortcuts import render
from django.http import HttpResponse
from kiosk.models import Product

# Create your views here.
def index(request):
    return render(request, "base.html", {})

def scan(request):
    return render(request, "scan.html", {})

def buyProduct(request):
    return HttpResponse("Nada")

def getCart(request):
    if not request.GET:
        return HttpResponse("Please pass products as get request")
    products = []
    for productString in request.GET.get("products").split('_'):
        products.append(Product.objects.get(barcode=productString))
    return render(request, "cart.html", {"products":products})
