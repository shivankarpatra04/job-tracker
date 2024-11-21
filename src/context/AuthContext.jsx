import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Check if user is logged in on mount
    useEffect(() => {
        const validateAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                const userData = localStorage.getItem('user');

                if (token && userData) {
                    // Verify token with backend
                    try {
                        // You should implement this endpoint in your API
                        const response = await authAPI.verifyToken(token);
                        if (response.data.valid) {
                            setUser(JSON.parse(userData));
                        } else {
                            // Token is invalid
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            setUser(null);
                        }
                    } catch (error) {
                        // Token verification failed
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        setUser(null);
                    }
                } else {
                    // No token or user data
                    setUser(null);
                }
            } catch (error) {
                console.error('Auth validation error:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        validateAuth();
    }, []);

    const register = async (userData) => {
        setLoading(true);
        try {
            const response = await authAPI.register(userData);
            setUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });

            if (response.data.success) {
                const { token, user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                return { success: true };
            }
            throw new Error(response.data.message || 'Login failed');
        } catch (err) {
            const message = err.response?.data?.error || err.message;
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const forgotPassword = async (email) => {
        setLoading(true);
        try {
            const response = await authAPI.forgotPassword(email);
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to send reset email');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (token, password) => {
        setLoading(true);
        try {
            const response = await authAPI.resetPassword(token, password);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to reset password');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const value = {
        user,
        loading,
        error,
        register,
        login,
        logout,
        forgotPassword,
        resetPassword,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;