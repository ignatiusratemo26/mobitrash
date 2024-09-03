import React, { useEffect, useState } from 'react'
import api from '../services/api';
import useAuth from './useAuth';
import { set } from 'react-hook-form';
import { CanceledError } from 'axios';

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
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false)
    const [requests, setRequests] = useState<Request[]>([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
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
              return;
          }
          if (location) {
              await api.post<Request>('/pickup-api/pickup-requests/', { 
                location: {latitude: location.lat,longitude: location.lng,},
              },
              {
                  headers : { Authorization: `Bearer ${token}`},
                  
              })
              .then(response => {
                  setRequests([response.data]);
                  setLoading(false);
              })
      
              .catch (error =>  {
                  if (error instanceof CanceledError) return;
                      setError(error.message);
                      setLoading(false);
              });
          }
      };

  return { location, submitRequest };
}

export default useSubmitRequest