from django.contrib import admin
from .models import PickupRequest


# Register your models here.
class PickupRequestAdmin(admin.ModelAdmin):
    model = PickupRequest
    list_display  = (
        'user','request_date','status','pickup_date','weight','payment_status','amount_due', 'latitude', 'longitude')
    search_fields = ['user','request_date_lte','status']

admin.site.register(PickupRequest, PickupRequestAdmin)
