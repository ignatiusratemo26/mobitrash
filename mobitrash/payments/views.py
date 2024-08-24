from django.shortcuts import render
from requests import Response
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Payment
from .serializers import PaymentSerializer
from . import daraja_utils
from rest_framework.decorators import action
class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    filter_backends = [DjangoFilterBackend,]
    filter_fields = ('user', 'status')
    search_fields = ('user__username', 'user__email', 'status')
    
    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        return super().create(request, *args, **kwargs)
          
    @action(detail=True, methods=['post'], url_path='make-payment')
    def make_payment(self, request, *args, **kwargs):
        payment = self.get_object()
        amount = payment.amount
        phone_number = payment.phone_number
        response = daraja_utils.initiate_payment(phone_number, amount)
        return Response(response)
        
        
        
        
        
