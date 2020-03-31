from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from rest_framework.urlpatterns import format_suffix_patterns

from .views import ObtainTokenPairWithUsernameView, CustomUserCreate, CustomUserGet

urlpatterns = [
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('user/<str:name>/', CustomUserGet.as_view(), name="get_user"),
    path('token/obtain/', ObtainTokenPairWithUsernameView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh')
]

urlpatterns = format_suffix_patterns(urlpatterns)