import axios from 'axios';
import { toast } from 'react-hot-toast';

// Make sure we have a default API URL if env variable is not set
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance with proper configuration
const api = axios.create({
    baseURL: `${API_URL}/api`, // Add /api prefix to match your backend routes
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important for handling cookies/sessions
});

// Request interceptor with error handling
api.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('token');

        // Add authorization header if token exists
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Log requests in development
        if (process.env.NODE_ENV === 'development') {
            console.log('API Request:', {
                url: config.url,
                method: config.method,
                data: config.data,
            });
        }

        return config;
    },
    (error) => {
        // Handle request errors
        console.error('Request Error:', error);
        toast.error('Failed to make request');
        return Promise.reject(error);
    }
);

// Response interceptor with enhanced error handling
api.interceptors.response.use(
    (response) => {
        // Log responses in development
        if (process.env.NODE_ENV === 'development') {
            console.log('API Response:', {
                url: response.config.url,
                status: response.status,
                data: response.data,
            });
        }
        return response;
    },
    (error) => {
        // Extract error message
        const message =
            error.response?.data?.message ||
            error.message ||
            'An unexpected error occurred';

        // Show error toast if toast is available
        if (toast) {
            toast.error(message);
        }

        // Handle different error scenarios
        switch (error.response?.status) {
            case 401:
                // Unauthorized - clear token and redirect to login
                localStorage.removeItem('token');
                window.location.href = '/login';
                break;
            case 403:
                // Forbidden
                toast.error('You do not have permission to perform this action');
                break;
            case 404:
                // Not Found
                toast.error('Resource not found');
                break;
            case 500:
                // Server Error
                toast.error('Server error occurred. Please try again later');
                break;
            default:
                // Other errors
                if (!navigator.onLine) {
                    toast.error('No internet connection');
                }
                break;
        }

        return Promise.reject(error);
    }
);

// Auth endpoints with proper error handling
export const authAPI = {
    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', {
                email: userData.email,
                password: userData.password,
                firstName: userData.firstName,
                lastName: userData.lastName,
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', {
                email: credentials.email,
                password: credentials.password,
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    forgotPassword: async (email) => {
        try {
            const response = await api.post('/auth/forgot-password', { email });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    resetPassword: async (token, password) => {
        try {
            const response = await api.put(`/auth/reset-password/${token}`, { password });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    logout: async () => {
        try {
            await api.post('/auth/logout');
            localStorage.removeItem('token');
            window.location.href = '/login';
        } catch (error) {
            localStorage.removeItem('token');
            window.location.href = '/login';
            throw error;
        }
    },

    // Add a method to check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },
};

// Export the configured axios instance
export default api;