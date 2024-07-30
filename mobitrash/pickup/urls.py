from rest_framework import routers
from django.urls import path, include
from .views import PickupRequestViewSet, AdminPickupRequestList

router = routers.DefaultRouter()
router.register(r'pickup-requests', PickupRequestViewSet, basename='pickup-request')

urlpatterns = [
    path('', include(router.urls)),
    path('recent-pickups/', PickupRequestViewSet.as_view({'get': 'recent_pickups'}), name='recent-pickups'),
    path('admin/pickup-list/<int:pk>/update-weight/', PickupRequestViewSet.as_view({'put': 'update_weight'}), name='update-pickup-weight'),
    path('admin/pickup-list/', AdminPickupRequestList.as_view(), name='admin-pickup-list'),
    path('user/<int:user_id>/pickup-requests/', PickupRequestViewSet.as_view({'get': 'list_user_pickups'}), name='user-pickup-requests'),
    path('user/<int:user_id>/pickup-requests/<int:pk>/', PickupRequestViewSet.as_view({'get': 'retrieve_by_user'}), name='user-retrieve-pickup-request'),
]
