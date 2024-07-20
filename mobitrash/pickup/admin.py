from django.contrib import admin
from .models import PickupRequest


# Register your models here.
class PickupRequestAdmin(PickupRequest):
    model = PickupRequest
    fields = '__all__'