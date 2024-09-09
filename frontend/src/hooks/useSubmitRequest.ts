import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { CanceledError } from 'axios';
import { useToast } from '@chakra-ui/react';

interface Request {
    id: number;
    user_email: string;
    request_date: string;
    amount_due: number;
    status: string;
    latitude: number;
    longitude: number;
}

const useSubmitRequest = () => {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const token = localStorage.getItem('token');
    const toast = useToast();
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [requests, setRequests] = useState<Request[]>([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('Location fetched:', position.coords);
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (err) => {
                console.error('Error fetching location:', err);
            }
        );
    }, []);

    const submitRequest = async () => {
        setLoading(true);
        if (!token) {
            console.log('No token found');
            setError('Authentication token is missing.');
            setLoading(false);
            return;
        }

        if (location) {
            console.log('Submitting request with location:', location);
            await api.post<Request>(
                '/pickup-api/pickup-requests/',
                { 
                    latitude: location.lat,
                    longitude: location.lng,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                console.log('Response data:', response.data);
                setRequests([response.data]);
                setLoading(false);
                toast({
                    title: 'Success',
                    description: 'Request submitted successfully.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error submitting request:', error);
                if (error instanceof CanceledError) return;
                setError(error.message);
                setLoading(false);
            });
        } else {
            console.log('Location is null, request not submitted.');
            setError('Location data is missing.');
            setLoading(false);
        }
    };

    return { location, submitRequest, isLoading, error, requests };
};

export default useSubmitRequest;
