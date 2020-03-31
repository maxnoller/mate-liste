from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseForbidden
from django.http import HttpResponseBadRequest
from django.contrib.auth.decorators import login_required
from .models import Favorite

def index(request):
    context = {}
    return render(request, "index.html", context)