import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Alert, AlertDescription } from '../ui/alert';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Show error message and redirect if not authenticated
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="w-full max-w-md space-y-4">
                    <Alert variant="destructive">
                        <AlertDescription>
                            You have to log in to see the dashboard.
                        </AlertDescription>
                    </Alert>
                    <Navigate
                        to="/login"
                        state={{ from: location.pathname }}
                        replace
                    />
                </div>
            </div>
        );
    }

    // Render children if authenticated
    return children;
};

export default ProtectedRoute;