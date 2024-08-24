from rest_framework import routers
from django.urls import path
from .views import PaymentViewSet

router = routers.DefaultRouter()
router.register(r'payments', PaymentViewSet, basename='payment')

urlpatterns = [
    path('pay/', PaymentViewSet.as_view({'post':'make-payment'}), name='make-payment'),
]