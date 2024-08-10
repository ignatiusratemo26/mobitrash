import { useState, useEffect } from 'react';
import api from '../services/api';
import { User } from '../types/User';
const useAuth = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const fetchUser = async () => {
    if (token) {
      try {
        const response = await api.get<User[]>('http://127.0.0.1:8000/accounts-api/user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched user data:', response.data[0]?.email);
        setCurrentUser(response.data[0]);
      } catch (error: any) {
          if (error.response?.status === 401) {
            await refreshToken();
          } 
          else {
            setCurrentUser(null);
            localStorage.removeItem('token');
            setToken(null);
        }
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);
  
  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/accounts-api/token/login/', {
        email,
        password,
      });
      const { access } = response.data; // Adjust this based on your API response
      localStorage.setItem('token', access);
      setToken(access);

      await fetchUser();
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
    try{
      await api.post("/accounts-api/logout");
    } catch (error) {
      console.error('Logout failed:', error);
    }    
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        const response = await api.post('/accounts-api/token/refresh/', {
          refresh: refreshToken,
        });
        const { access } = response.data; // Extract new access token
        localStorage.setItem('token', access); // Update access token in local storage
        setToken(access); // Update state with new access token

        // Retry the fetchUser request
        await fetchUser();
      } catch (error) {
        console.error('Token refresh failed:', error);
        // Handle token refresh failure, e.g., redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setToken(null);
        setCurrentUser(null);
      }
    }
  };


  return { token, currentUser, login, register, logout };
};
export default useAuth;



  

