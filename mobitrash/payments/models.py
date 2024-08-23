from django.db import models
from accounts.models import CustomUser as User
from pickup.models import PickupRequest
# Create your models here.
class Payment(models.Model):
    STATUS_CHOICES = (
        ('P', 'Pending'),
        ('C', 'Completed'),
        ('F', 'Failed'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pickup_request = models.ForeignKey(PickupRequest, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='P')
    created_at = models.DateTimeField(auto_now_add=True)
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
