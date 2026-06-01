import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

// Layouts
import RootLayout from './components/layouts/RootLayout';

// Auth Pages
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Main Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import { Profile } from './pages/Profile';
import Interviews from './pages/Interviews';

// Custom 404 Component
const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center bg-background px-4">
    <div className="text-center">
      <p className="text-7xl font-extrabold text-gradient">404</p>
      <h1 className="mt-4 text-xl font-semibold">Page not found</h1>
      <p className="mt-1 text-muted-foreground">
        The page you're looking for doesn't exist or has moved.
      </p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={() => window.history.back()}
          className="rounded-lg border bg-card px-5 py-2.5 text-sm font-medium shadow-soft transition-all duration-200 hover:bg-muted active:scale-[0.97]"
        >
          Go back
        </button>
        <a
          href="/dashboard"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-glow active:scale-[0.97]"
        >
          Go to dashboard
        </a>
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(222 47% 11%)',
            color: '#fff',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
            boxShadow: '0 8px 30px -6px rgba(15,23,42,0.25)',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
          error: { iconTheme: { primary: '#f43f5e', secondary: '#fff' } },
        }}
      />
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Protected Routes - Wrapped in RootLayout */}
            <Route element={<RootLayout />}>  {/* Remove ProtectedRoute here */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>  {/* Move ProtectedRoute here */}
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/applications"
                element={
                  <ProtectedRoute>
                    <Applications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/interviews"
                element={
                  <ProtectedRoute>
                    <Interviews />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;