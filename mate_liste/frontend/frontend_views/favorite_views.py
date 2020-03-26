from django.shortcuts import render

def add_favorite_view(request):
    return render(request, 'favorites/add_favorite.html', {})