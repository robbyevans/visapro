
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { store } from './store'; 
import { logout } from './slices/authSlice';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Authentication Error: Token is invalid or expired. Logging out.");
      store.dispatch(logout());
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;