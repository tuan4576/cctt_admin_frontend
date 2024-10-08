import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { API_URL } from "./config";

interface CustomAxiosInstance extends AxiosInstance {
  enableUploadFile: () => void;
  enableJson: () => void;
}

const axiosInstance: CustomAxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
  }
}) as CustomAxiosInstance;

axiosInstance.enableUploadFile = function() {
  this.defaults.headers['Content-Type'] = 'multipart/form-data';
};

axiosInstance.enableJson = function() {
  this.defaults.headers['Content-Type'] = 'application/json';
};

// Interceptor to update the token before each request
axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  // Ensure PATCH requests are properly handled
  if (config.method?.toLowerCase() === 'patch') {
    config.headers['Content-Type'] = 'application/json';
  }
  // Handle file uploads
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor to handle network errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === 'Network Error') {
      console.error('A network error occurred. Please check your internet connection.');
      // You can add additional handling here, such as showing a user-friendly message
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;