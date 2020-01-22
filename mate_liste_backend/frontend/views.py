from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.http import HttpResponseForbidden
from django.http import HttpResponseBadRequest
from kiosk.models import Product
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout

# Create your views here.
def logout_view(request):
    logout(request)
    return HttpResponseRedirect("/")

def index(request):
    return render(request, "base.html", {})

@login_required(redirect_field_name='next', login_url='/login')
def scan(request):
    return render(request, "scan.html", {})

def buyProducts(request):
    if not request.GET:
        return HttpResponseBadRequest("Please pass products as get request")
    if not request.user:
        return HttpResponseForbidden("Only possible when logged in")
    products = parseProductString(request.GET.get('products'))
    for product in products:
        Product.buyProduct(request.user, product)
    return HttpResponse("Success")

def getCart(request):
    if not request.GET:
        return HttpResponseBadRequest("Please pass products as get request")
    products = parseProductString(request.GET.get('products'))
    return render(request, "cart.html", {"products":products})

def parseProductString(string):
    products = []
    for productString in string.split('_'):
        products.append(Product.objects.get(barcode=productString))
    return products