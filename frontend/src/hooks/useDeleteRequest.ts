import React from 'react'
import useAuth from './useAuth';
import api from '../services/api';
import { useToast } from '@chakra-ui/react';

const useDeleteRequest = () => {
    const { token } = useAuth();
    const toast = useToast();
    const deleteRequest = async (requestId: number) => {
        
        
        if (!token) {
          toast({
            title: 'Unauthenticated',
            description: 'Please login to continue',
            status: 'error',
            duration: 5000,
            isClosable: true,
            });
          return;
        }
      
        try {
          const response = await api.delete(`/pickup-api/pickup-requests/${requestId}/`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          toast({
            title: 'Success',
            description: 'Request deleted successfully.',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
        } catch (error: any) {
            toast({
            title: 'Error',
            description: `Error deleting the request: ${error.message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
        }
      };
      
      return deleteRequest;
}

export default useDeleteRequest