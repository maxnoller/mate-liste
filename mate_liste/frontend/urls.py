from django.urls import path, re_path
from . import views
from .frontend_views import account_views
from .frontend_views import general_views
from .frontend_views import favorite_views
urlpatterns = [
    path("", views.index, name="index"),
    re_path(r'^.*/$', views.index)
    ]
