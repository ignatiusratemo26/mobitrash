from rest_framework import routers
from django.urls import path, include
from .views import PickupRequestViewSet, AdminPickupRequestViewSet

router = routers.DefaultRouter()
router.register(r'pickup-requests', PickupRequestViewSet, basename='pickup-request')
urlpatterns = [
    path('', include(router.urls)),
    path('admin/pickup-list/', AdminPickupRequestViewSet.as_view({'get':'list'}), name='admin-pickup-list'),
    path('admin/pickup-list/<int:pk>/', AdminPickupRequestViewSet.as_view({'get': 'pickup_request','patch':'pickup_request', 'delete':'pickup_request'}), name='pickup-request'),
    path('admin/pickup-list/<int:pk>/update-weight/', AdminPickupRequestViewSet.as_view({'patch': 'update_weight'}), name='update-pickup-weight'),
    
    path('recent-pickups/', PickupRequestViewSet.as_view({'get': 'recent_pickups'}), name='recent-pickups'),
    path('pickup-requests/<int:pk>/', PickupRequestViewSet.as_view({'get': 'retrieve_pickup_request', 'delete': 'destroy'}), name='user-retrieve-pickup-request'),
    path('pickup-request/<int:pk>/update-request/', PickupRequestViewSet.as_view({'patch': 'update_request'}), name='update-pickup-request'),
    path('pickup-request/<int:pk>/cancel/', PickupRequestViewSet.as_view({'patch': 'cancel_request'}), name='cancel-pickup-request'),
]