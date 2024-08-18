from django.contrib import admin

from mobitrash.payments.models import Payment

# Register your models here.
@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'pickup_request', 'amount', 'status', 'created_at', 'transaction_id')
    list_filter = ('status', 'created_at')
    search_fields = ('user__username', 'pickup_request__id', 'transaction_id')
    list_display_links = ('id', 'user', 'pickup_request')
    list_editable = ('amount', 'status')
    list_per_page = 25
    list_max_show_all = 100
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)