import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '../components/ui/card';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { Loader2, Briefcase, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();
    const { resetPassword } = useAuth();

    const validateForm = () => {
        if (!token) {
            setError('Invalid reset token');
            return false;
        }
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setError('');

        try {
            const response = await resetPassword(token, formData.password);

            if (response.success) {
                setSuccess(true);
                toast.success('Password reset successful!');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (err) {
            console.error('Reset password error:', err);
            setError(err.message || 'Failed to reset password');
            toast.error(err.message || 'Failed to reset password');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    React.useEffect(() => {
        if (!token) {
            setError('Invalid or missing reset token');
            toast.error('Invalid or missing reset token');
        }
    }, [token]);

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-200/50 to-violet-200/40 blur-3xl" />
            </div>

            <div className="w-full max-w-md animate-fade-up">
                <div className="mb-6 flex flex-col items-center text-center">
                    <Link to="/" className="mb-4 flex items-center gap-2.5">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-glow">
                            <Briefcase className="h-5 w-5" />
                        </span>
                        <span className="text-xl font-bold tracking-tight">TrackWise</span>
                    </Link>
                </div>

                <Card className="shadow-card-hover">
                    {success ? (
                        <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                <CheckCircle2 className="h-6 w-6" />
                            </span>
                            <div>
                                <h3 className="text-lg font-semibold">Password reset successful</h3>
                                <p className="mt-1 text-sm text-muted-foreground">Redirecting you to the login page…</p>
                            </div>
                        </CardContent>
                    ) : (
                        <>
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-center text-2xl font-bold">Set a new password</CardTitle>
                                <CardDescription className="text-center">
                                    Choose a strong password you'll remember
                                </CardDescription>
                            </CardHeader>
                            <form onSubmit={handleSubmit}>
                                <CardContent className="space-y-4">
                                    {error && (
                                        <div role="alert" className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                                            <AlertCircle className="h-4 w-4 shrink-0" />
                                            {error}
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <label htmlFor="password" className="text-sm font-medium">New password</label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                                placeholder="At least 8 characters"
                                                autoComplete="new-password"
                                                disabled={isLoading}
                                                className="pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((s) => !s)}
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm new password</label>
                                        <Input
                                            id="confirmPassword"
                                            type={showPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            placeholder="Re-enter your password"
                                            autoComplete="new-password"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-col space-y-4">
                                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {isLoading ? 'Resetting…' : 'Reset password'}
                                    </Button>
                                    <Link to="/login" className="text-center text-sm font-medium text-primary hover:underline">
                                        Return to sign in
                                    </Link>
                                </CardFooter>
                            </form>
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default ResetPassword;
