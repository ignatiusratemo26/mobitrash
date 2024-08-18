import requests
from django.conf import settings
import base64

def get_access_token():
    consumer_key = settings.DARAJA_CONSUMER_KEY
    consumer_secret = settings.DARAJA_CONSUMER_SECRET
    api_url = settings.DARAJA_API_URL
    api_key = settings.DARAJA_API_KEY

    # Get the access token
    credentials = base64.b64encode(f"{consumer_key}:{consumer_secret}".encode()).decode('utf-8')
    api_url = f"{api_url}/oauth/v1/generate?grant_type=client_credentials"
    response = requests.get(api_url, auth=(consumer_key, consumer_secret))
    headers = {
        "Authorization": f"Basic {credentials}",
        "Content-Type": "application/json"
    }
    access_token = response.json().get('access_token')
    return access_token

def initiate_payment(phone_number, amount):
    access_token = get_access_token()
    api_url = settings.DARAJA_API_URL
    api_key = settings.DARAJA_API_KEY
    headers = {"Authorization": f"Bearer {access_token}", "Content-Type": "application/json"}
    payload = { "BusinessShortCode": api_key, 
               "Password": "password", 
               "Timestamp": "timestamp", 
               "TransactionType": "CustomerPayBillOnline", 
               "Amount": amount, 
               "PartyA": phone_number, 
               "PartyB": api_key, 
               "PhoneNumber": phone_number, 
               "CallBackURL": "https://example.com/callback", 
               "AccountReference": "MobiTrash", 
               "TransactionDesc": "Payment for trash collection" }
    response = requests.post(f"{api_url}/mpesa/stkpush/v1/processrequest", headers=headers, json=payload)
    return response.json()