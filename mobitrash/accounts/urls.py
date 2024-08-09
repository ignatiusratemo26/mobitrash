from django.urls import path
from .views import UserViewSet, UserRegister, UserLogin, MyTokenObtainPairView
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
router = routers.DefaultRouter()
router.register(r'user', UserViewSet, basename='user')

urlpatterns = router.urls

urlpatterns += [
    path('token/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserRegister.as_view(), name= 'user-register'),
    path('login/', UserLogin.as_view(), name='user-login')
]
