from django.contrib.auth import get_user_model, authenticate
from .permissions import IsOwner
from .serializers import PickupRequestSerializer
from .models import PickupRequest
from rest_framework import permissions, viewsets,filters,status
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from accounts.models import CustomUser as User   

class AdminPickupRequestViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated , permissions.IsAdminUser)
    serializer_class = PickupRequestSerializer
    queryset = PickupRequest.objects.all()
    
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    
    ordering_fields = ['pickup_date', 'user__email','user__id', 'status', ]
    search_fields = ['pickup_date', 'user__email','user__id', 'status', ]  # Add fields you want to search on
    filterset_fields = ['pickup_date', 'user__email','user__id', 'status', ]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['get','patch','put', 'post'], url_path='pickup-request')
    def pickup_request(self, request, pk=None):
        pickup_request =self.get_object()
        serializer = self.get_serializer(pickup_request)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get','patch'], url_path='update-weight')
    def update_weight(self, request, pk=None):
        pickup_request = self.get_object()
        weight = request.data.get('weight')
        pickup_request.weight = weight
        pickup_request.calculate_amount_due()
        pickup_request.status = 'In Progress'
        pickup_request.save()
        serializer = self.get_serializer(pickup_request)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='user/(?P<user_id>\d+)/pickup-requests/(?P<pk>\d+)', url_name='user_retrieve_pickup_request')
    def retrieve_by_user(self, request, user_id=None, pk=None):
        try:
            pickup_request = PickupRequest.objects.get(pk=pk, user_id=user_id)
        except PickupRequest.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(pickup_request)
        return Response(serializer.data)
    
class PickupRequestViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated ,IsOwner)
    serializer_class = PickupRequestSerializer
    queryset = PickupRequest.objects.all()
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    http_method_names = ['get', 'post', 'put', 'patch', 'delete'] 
    ordering_fields = ['pickup_date', 'id']
    search_fields = ['pickup_date', 'user__email','user__id', 'status', ]
    filterset_fields = ['pickup_date', 'user__email','user__id', 'status', ]
    
    def create(self, request, *args, **kwargs):
        try:
            user = request.user
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user).order_by('-id')

    
    def recent_pickups(self, request):
        recent_pickups = PickupRequest.objects.filter(user=self.request.user).order_by('-id')[:4]
        page = self.paginate_queryset(recent_pickups)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(recent_pickups, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='pickup-requests', url_name='user_pickups')
    def list_user_pickups(self, request, user_id=None):
        pickups = PickupRequest.objects.filter(user=request.user)
        
        page = self.paginate_queryset(pickups)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(pickups, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='pickup-requests/(?P<pk>\d+)', url_name='user_retrieve_pickup_request')
    def retrieve_pickup_request(self, request, user_id=None, pk=None):
        try:
            pickup_request = PickupRequest.objects.get(pk=pk, user=request.user)
        except PickupRequest.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(pickup_request)
        return Response(serializer.data)
    
    @action(detail=True, methods=['patch'], url_path='update-request')
    def update_request(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = PickupRequestSerializer(instance, data= request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['patch'], url_path='cancel')
    def cancel_request(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.status != 'Pending':
            return Response({'detail': 'Only pending requests can be canceled.'}, status=status.HTTP_400_BAD_REQUEST)
        if instance.user != request.user:
            return Response({'detail': 'You are not allowed to cancel this request.'}, status=status.HTTP_403_FORBIDDEN)
        instance.status = 'Canceled'
        instance.save()
        serializer = PickupRequestSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def destroy(self, request, *args, **kwargs):
        """
        Destroys a pickup request instance.
        """
        instance = self.get_object()
        if instance.status != 'Pending':
            return Response({'detail': 'Only pending requests can be deleted.'}, status=status.HTTP_400_BAD_REQUEST)
        
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
