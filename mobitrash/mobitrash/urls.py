from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from accounts import views as account_views

router = routers.DefaultRouter()

urlpatterns = router.urls

urlpatterns += [
    path('admin/', admin.site.urls),
    path('accounts-api/', include('accounts.urls')),
    path('pickup-api/', include('pickup.urls')),
    path('payment-api/', include('payments.urls')),
]
