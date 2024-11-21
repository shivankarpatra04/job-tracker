import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = process.env.REACT_APP_API_URL

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || error.message;
        // Check if toast is defined before using it
        if (toast) {
            toast.error(message);
        }

        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth endpoints matching your backend
export const authAPI = {
    register: (userData) =>
        api.post('/auth/register', {
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
        }),

    login: (credentials) =>
        api.post('/auth/login', {
            email: credentials.email,
            password: credentials.password,
        }),

    forgotPassword: (email) =>
        api.post('/auth/forgot-password', { email }),

    resetPassword: (token, password) =>
        api.put(`/auth/reset-password/${token}`, { password }),
};
export default api;