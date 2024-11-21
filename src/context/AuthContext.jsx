import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';
import { toast } from 'react-hot-toast';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const validateAuth = async () => {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');

            if (!token || !userData) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const response = await authAPI.get('/auth/verify');
                if (response.data.valid) {
                    setUser(JSON.parse(userData));
                } else {
                    logout();
                }
            } catch (error) {
                console.error('Auth validation error:', error);
                logout();
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
            const { user: newUser, token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(newUser));
            setUser(newUser);
            toast.success('Registration successful!');
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        setLoading(true);
        try {
            const response = await authAPI.login(credentials);
            const { user: loggedInUser, token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            setUser(loggedInUser);
            toast.success('Login successful!');
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed';
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
            toast.success('Reset link sent successfully!');
            return response.data;
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to send reset email';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (token, password) => {
        setLoading(true);
        try {
            const response = await authAPI.resetPassword(token, password);
            toast.success('Password reset successful!');
            return response.data;
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to reset password';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        toast.success('Logged out successfully');
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
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;