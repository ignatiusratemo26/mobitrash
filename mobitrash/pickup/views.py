from django.shortcuts import render
from django.contrib.auth import get_user_model, authenticate
from .permissions import IsOwnerOrReadOnly
from .serializers import PickupRequestSerializer
from .models import PickupRequest
from rest_framework import permissions, mixins, generics, viewsets,filters,status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination


class AdminPickupRequestList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated , permissions.IsAdminUser)
    serializer_class = PickupRequestSerializer
    queryset = PickupRequest.objects.all()
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    
    ordering_fields = ['pickup_date', 'user__email','user__id', 'status', ]
    search_fields = ['pickup_date', 'user__email','user__id', 'status', ]  # Add fields you want to search on
    filterset_fields = ['pickup_date', 'user__email','user__id', 'status', ]

    
    @action(detail=True, methods=['get'],  url_path='recent-pickups')
    def recent_pickups(self, request):
        recent_pickups = PickupRequest.objects.all().order_by('-pickup_date')

        page = self.paginate_queryset(recent_pickups)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(recent_pickups, many=True)
        return Response(serializer.data)
    
    
    
class PickupRequestViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated ,IsOwnerOrReadOnly)
    serializer_class = PickupRequestSerializer
    queryset = PickupRequest.objects.all()
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    
    ordering_fields = ['pickup_date', 'user__email','user__id', 'status', ]
    search_fields = ['pickup_date', 'user__email','user__id', 'status', ]  # Add fields you want to search on
    filterset_fields = ['pickup_date', 'user__email','user__id', 'status', ]
    
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    
    @action(detail=True, methods=[ 'put'], permission_classes=[permissions.IsAdminUser], url_path='update-weight')
    def update_weight(self, request, pk=None):
        pickup_request = self.get_object()
        weight = request.data.get('weight')
        pickup_request.weight = weight
        pickup_request.calculate_amount_due()
        pickup_request.status = 'In Progress'
        pickup_request.save()
        serializer = self.get_serializer(pickup_request)
        return Response(serializer.data)
    
    def recent_pickups(self, request):
        recent_pickups = PickupRequest.objects.filter(user=self.request.user).order_by('-pickup_date')

        page = self.paginate_queryset(recent_pickups)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(recent_pickups, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='user/(?P<user_id>\d+)/pickup-requests', url_name='user_pickups')
    def list_user_pickups(self, request, user_id=None):
        # You may want to add permissions to ensure the request.user has the right to view the pickups for this user
        pickups = PickupRequest.objects.filter(user_id=user_id)
        
        page = self.paginate_queryset(pickups)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(pickups, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='user/(?P<user_id>\d+)/pickup-requests/(?P<pk>\d+)', url_name='user_retrieve_pickup_request')
    def retrieve_by_user(self, request, user_id=None, pk=None):
        try:
            pickup_request = PickupRequest.objects.get(pk=pk, user_id=user_id)
        except PickupRequest.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(pickup_request)
        return Response(serializer.data)
