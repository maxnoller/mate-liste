from django.urls import path
from . import views
from .frontend_views import account_views
from .frontend_views import general_views
urlpatterns = [
    path("", views.index, name="index"),
    path("scan", views.scan, name="scan"),
    path("getCart", views.get_cart_view, name="getCart"),
    path("buyProducts", views.buy_products_view, name="buyProducts"),
    path("logout", account_views.logout_view, name="logout"),
    path("login", account_views.login_view, name="login"),
    path("settings", general_views.settings_view, name="settings"),
    path("impressum", general_views.impressum_view, name="impressum"),
    ]
