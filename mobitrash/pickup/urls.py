from rest_framework import routers
from django.urls import path, include
from .views import PickupRequestViewSet, AdminPickupRequestViewSet

router = routers.DefaultRouter()
router.register(r'', PickupRequestViewSet, basename='pickup-request')

urlpatterns = [
    path('', include(router.urls)),
    path('recent-pickups/', PickupRequestViewSet.as_view({'get': 'recent_pickups'}), name='recent-pickups'),
    
    path('admin/pickup-list/', AdminPickupRequestViewSet.as_view({'get':'list'}), name='admin-pickup-list'),
    path('admin/pickup-list/<int:pk>/', AdminPickupRequestViewSet.as_view({'get': 'pickup_request','patch':'pickup_request', 'delete':'pickup_request'}), name='pickup-request'),
    path('admin/pickup-list/<int:pk>/update-weight/', AdminPickupRequestViewSet.as_view({'patch': 'update_weight'}), name='update-pickup-weight'),
    
    path('pickup-requests/', PickupRequestViewSet.as_view({'get': 'list_user_pickups', 'post': 'create'}), name='user-pickup-requests'),
    path('pickup-requests/<int:pk>/', PickupRequestViewSet.as_view({'get': 'retrieve_pickup_request'}), name='user-retrieve-pickup-request'),
]