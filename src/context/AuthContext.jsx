import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const AuthContext = createContext(null);
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' }
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const validateAuth = async () => {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');

            if (!token || !userData) {
                setUser(null);
                return;
            }

            try {
                const response = await api.get('/auth/verify', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.valid) {
                    setUser(JSON.parse(userData));
                } else {
                    handleLogout();
                }
            } catch (error) {
                console.error('Auth validation error:', error);
                handleLogout();
            }
        };

        validateAuth();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const register = async (userData) => {
        setLoading(true);
        try {
            const response = await api.post('/auth/register', userData);

            const { user: newUser, token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(newUser));
            setUser(newUser);

            toast.success('Registration successful!');
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed';
            toast.error(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });

            const { user: loggedInUser, token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            setUser(loggedInUser);

            toast.success('Login successful!');
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed';
            toast.error(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const forgotPassword = async (email) => {
        setLoading(true);
        try {
            const response = await api.post('/auth/forgot-password', { email });
            toast.success('Reset password email sent!');
            return response.data;
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to send reset email';
            toast.error(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (token, password) => {
        setLoading(true);
        try {
            const response = await api.put(`/auth/reset-password/${token}`, { password });
            toast.success('Password reset successful!');
            return response.data;
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to reset password';
            toast.error(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        error,
        register,
        login,
        logout: handleLogout,
        forgotPassword,
        resetPassword,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;