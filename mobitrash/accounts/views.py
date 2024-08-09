from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import UserLoginSerializer, UserRegisterSerializer, UserSerializer, PasswordSerializer, MyTokenObtainPairSerializer
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from .models import CustomUser as User
from .validations import custom_validation
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView


@method_decorator(csrf_exempt, name='dispatch')
class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset that provides the standard actions
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes=[IsAuthenticated]

    @action(detail=True, methods=['post', 'put'])
    def set_password(self, request, pk=None):
        user = self.get_object()
        serializer = PasswordSerializer(data=request.data)
        if serializer.is_valid():
            user.set_password(serializer.validated_data['password'])
            user.save()
            return Response({'status': 'password set'})
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False)
    def recent_users(self):
        recent_users = User.objects.all().order_by('-last_login')

        page = self.paginate_queryset(recent_users)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(recent_users, many=True)
        return Response(serializer.data)




@method_decorator(csrf_exempt, name='dispatch')
class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    **serializer.data
                }, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)
      
@method_decorator(csrf_exempt, name='dispatch')
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    throttle_scope = 'login'
      
@method_decorator(csrf_exempt, name='dispatch')
class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (TokenAuthentication,)

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(username=email, password=password)
            if user is not None:
                # Generate JWT tokens
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class UserLogout(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        try:
            # Extract the refresh token from the request
            refresh_token = request.data.get('refresh_token')
            if refresh_token:
                # Create a RefreshToken object to blacklist it
                token = RefreshToken(refresh_token)
                token.blacklist()  # Optional: Requires `djangorestframework-simplejwt` blacklist feature

            return Response({'message': 'Logged out successfully'}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)