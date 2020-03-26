from django.shortcuts import render

def impressum_view(request):
    """View function for impressum page"""
    return render(request, "impressum.html", {})

def settings_view(request):
    """View function for settings page"""
    return render(request, "settings.html", {})
