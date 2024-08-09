// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import api from '../services/api';
import axiosInstance from '../services/axiosInstance';
import { User } from '../types/User';
const useAuth = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await axiosInstance.get<User>('http://127.0.0.1:8000/accounts-api/user/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCurrentUser(response.data);
        } catch (error) {
          // Handle error (e.g., redirect to login)
          setCurrentUser(null);
        }
      }
    };

    fetchUser();
  }, []);
  

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/accounts-api/token/login/', {
        email,
        password,
      });
      const token = response.data.token; // Adjust this based on your API response
      localStorage.setItem('token', token);
      setCurrentUser(null);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (email: string, username: string, password: string) => {
    await api.post("/register/", { email, username, password });
    await login(email, password);
  };

  const logout = async () => {
    await api.post("/accounts-api/logout");
    setCurrentUser(null);
    setToken(null);
  };

  return { token, currentUser, login, register, logout };
};
export default useAuth;
