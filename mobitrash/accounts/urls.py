from django.urls import path
from .views import UserViewSet, UserRegister, UserLogin
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'user', UserViewSet, basename='user')

urlpatterns = router.urls

urlpatterns += [
    path('register/', UserRegister.as_view(), name= 'user-register'),
    path('login/', UserLogin.as_view(), name='user-login')
]
