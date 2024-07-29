from rest_framework import serializers
from pickup.models import PickupRequest

class PickupRequestSerializer(serializers.ModelSerializer):#
    class Meta:
        model = PickupRequest
        fields = '__all__'