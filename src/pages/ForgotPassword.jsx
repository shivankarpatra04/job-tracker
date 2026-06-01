import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '../components/ui/card';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { Loader2, Briefcase, AlertCircle, CheckCircle2, ArrowLeft, Mail } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { forgotPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Email is required');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await forgotPassword(email);
            if (response.success) {
                setSuccess(true);
                toast.success('Reset link sent successfully!');
            }
        } catch (err) {
            console.error('Forgot password error:', err);
            setError(err.message || 'Failed to send reset link');
            toast.error(err.message || 'Failed to send reset link');
        } finally {
            setIsLoading(false);
        }
    };

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
                                <h3 className="text-lg font-semibold">Check your email</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    We've sent a password reset link to <span className="font-medium text-foreground">{email}</span>.
                                    If it doesn't appear within a few minutes, check your spam folder.
                                </p>
                            </div>
                            <Button asChild variant="outline" className="mt-2">
                                <Link to="/login">
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Return to sign in
                                </Link>
                            </Button>
                        </CardContent>
                    ) : (
                        <>
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-center text-2xl font-bold">Reset your password</CardTitle>
                                <CardDescription className="text-center">
                                    Enter your email and we'll send you a reset link
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
                                        <label htmlFor="email" className="text-sm font-medium">Email address</label>
                                        <div className="relative">
                                            <Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value.trim())}
                                                placeholder="you@example.com"
                                                autoComplete="email"
                                                required
                                                disabled={isLoading}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-col space-y-4">
                                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {isLoading ? 'Sending…' : 'Send reset link'}
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

export default ForgotPassword;
