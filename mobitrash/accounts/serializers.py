from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError
from pickup.serializers import PickupRequestSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model= UserModel
        fields = '__all__'
        
        def create(self, clean_data):
            user = UserModel.objects.create_user(
                email=clean_data['email'],
                password=clean_data['password']
            )
            user.save()
            return user

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token
    
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    class Meta:
        model = UserModel
        fields = ('email', 'password')
    
    def check_user(self, clean_data):
        user = authenticate(email=clean_data['email'],
                password=clean_data['password'])
        if not user:
            raise ValidationError('user not found')
        return user

class UserSerializer(serializers.ModelSerializer):
    pickup_requests = PickupRequestSerializer(many=True, read_only=True)
    class Meta:
        model = UserModel
        fields = 'email', 'address', 'phone_number', 'pickup_requests'
        
        
class PasswordSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=True, min_length=8)

    def validate(self, data):
        """
        Check that the two password entries match.
        """
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data