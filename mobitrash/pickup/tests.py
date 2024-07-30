from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from .models import PickupRequest
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient


# Test listing and creating pick up requests
class PickupRequestViewSetTests(APITestCase):
    def setUp(self):
        # Create a user and authenticate
        self.user = get_user_model().objects.create_user(
            email='testuser@example.com',
            password='testpassword'
        )
        # self.token = Token.objects.create(user=self.user)
        # self.client = APIClient()
        # self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.client.login(username='testuser@example.com', password='testpassword')
        self.url = reverse('pickup-request')  # URL for listing and creating pickup requests

    def test_list_pickup_requests(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)  # No requests initially

    def test_create_pickup_request(self):
        data = {
            'pickup_date': '2024-07-30',
            'status': 'Pending',
            'weight': 10
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(PickupRequest.objects.count(), 1)
        self.assertEqual(PickupRequest.objects.get().status, 'Pending')


# test update pickup request weight
    def test_update_weight(self):
        # First, create a pickup request
        pickup_request = PickupRequest.objects.create(
            pickup_date='2024-07-30T14:00:00Z',  # DateTime in ISO 8601 format
            status='Pending',
            weight=10,
            user=self.user
        )
        url = reverse('update-pickup-weight', args=[pickup_request.id])
        data = {'weight': 20}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        pickup_request.refresh_from_db()
        self.assertEqual(pickup_request.weight, 20)
        self.assertEqual(pickup_request.status, 'In Progress')


# test list pickup requests by user
    def test_list_user_pickups(self):
        # Create another user and pickup request
        other_user = get_user_model().objects.create_user(
            email='otheruser@example.com',
            password='otherpassword'
        )
        PickupRequest.objects.create(
            pickup_date='2024-07-30',
            status='Pending',
            weight=10,
            user=other_user
        )
        PickupRequest.objects.create(
            pickup_date='2024-07-31',
            status='Pending',
            weight=15,
            user=self.user
        )
        url = reverse('user-pickup-requests', args=[self.user.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Only one request for the current user

# test for admin list pickup requests and create pickup request
class AdminPickupRequestListTests(APITestCase):
    def setUp(self):
        # Create admin user and authenticate
        self.admin_user = get_user_model().objects.create_superuser(
            email='adminuser@example.com',
            password='adminpassword'
        )
        # self.token = Token.objects.create(user=self.admin_user)
        # self.client = APIClient()
        # self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.client.login(username='adminuser@example.com', password='adminpassword')
        self.url = reverse('admin-pickup-list')  # URL for listing and creating pickup requests as admin

    def test_admin_list_pickup_requests(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)  # No requests initially

    def test_admin_create_pickup_request(self):
        data = {
            'pickup_date': '2024-07-30T14:00:00Z',
            'status': 'Pending',
            'weight': 10
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(PickupRequest.objects.count(), 1)
        self.assertEqual(PickupRequest.objects.get().status, 'Pending')
