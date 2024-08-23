from rest_framework import serializers
from .models import PickupRequest

class PickupRequestSerializer(serializers.ModelSerializer):
    user_id = serializers.ReadOnlyField(source='user.id')
    user_email = serializers.ReadOnlyField(source='user.email')
    class Meta:
        model = PickupRequest
        fields = '__all__'
        extra_kwargs = {
            'user': {'required': False, 'read_only': True}
        }