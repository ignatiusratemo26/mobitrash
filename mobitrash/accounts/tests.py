from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import CustomUser as User
from django.contrib.auth.hashers import check_password

class UserSetPasswordTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='testuser@test.com', 
                                             password='old_password', 
                                             first_name= "test",
                                             last_name= "testlast",
                                             address= "kiambu",
                                             phone_number= "783452375")
        self.user_url = reverse('user-detail', args=[self.user.id])
        self.set_password_url = reverse('user-set-password', args=[self.user.id])
        self.client.force_authenticate(user=self.user)

    def test_set_password_success(self):
        data = {
            'password': 'new_secure_password',
            'confirm_password': 'new_secure_password'
        }
        response = self.client.post(self.set_password_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertTrue(check_password('new_secure_password', self.user.password))

    def test_set_password_passwords_do_not_match(self):
        data = {
            'password': 'new_secure_password',
            'confirm_password': 'different_password'
        }
        response = self.client.post(self.set_password_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.user.refresh_from_db()
        self.assertTrue(check_password('old_password', self.user.password))

    def test_set_password_unauthenticated(self):
        self.client.force_authenticate(user=None)
        #self.client.logout()
        data = {
            'password': 'new_secure_password',
            'confirm_password': 'new_secure_password'
        }
        response = self.client.post(self.set_password_url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
'''
{
    "email": "test5@gmail.com",
    "password": "12345678?",
    "first_name": "test",
    "last_name": "testlst",
    "address": "kiambu",
    "phone_number": "783452375"
}

'''