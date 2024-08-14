// services/axiosInstance.ts
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// client.interceptors.response.use(
//     response => response,
//     error => {
//       if (error.response && error.response.status === 401) {
//         localStorage.removeItem('token');
//         window.location.href = '/login'; // Redirect to login page if unauthorized
//       }
//       return Promise.reject(error);
//     }
//   );

export default client;
