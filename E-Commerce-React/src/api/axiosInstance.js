import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api', // Your API base URL
  withCredentials: true, // if you're using cookies
});

// Global error interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // pass through successful responses
  (error) => {
    const status = error.response?.status;

    if (status) {
      switch (status) {
        case 400:
        case 422:
          alert("Validation error. Please check your input.");
          break;
        case 401:
          window.location.href = '/Login'; // or use useNavigate in component
          break;
        case 403:
          window.location.href = '/forbidden';
          break;
        case 404:
          window.location.href = '/not-found';
          break;
        case 500:
          window.location.href = '/server-error';
          break;
        default:
          alert("Unexpected error occurred.");
      }
    }

    return Promise.reject(error); // Allow component-specific handling too
  }
);

export default axiosInstance;
