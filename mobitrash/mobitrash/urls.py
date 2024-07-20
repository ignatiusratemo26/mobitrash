from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('pickup/', include('pickup.api.urls')),
    path('payments/', include('payments.api.urls')),
]
