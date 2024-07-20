from django.db import models
from accounts.models import CustomUser as User

# Create your models here.
class PickupRequest(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
    ]
    PAYMENT_STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    request_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    pickup_date = models.DateTimeField(null=True, blank=True)
    weight = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # Weight in kg
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='Pending')
    amount_due = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def calculate_amount_due(self):
        # Assume a rate per kg, e.g., $10 per kg
        rate_per_kg = 10
        if self.weight:
            self.amount_due = self.weight * rate_per_kg
        else:
            self.amount_due = 0
