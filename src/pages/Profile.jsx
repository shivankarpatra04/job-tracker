// pages/Profile.jsx
import React from 'react';
import { useProfile } from '../hooks/useProfile';
import { useInterviews } from '../hooks/useInterviews';
import { ProfileDetail } from '../components/profile/ProfileDetail';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

export function Profile() {
    const {
        profileData,
        applications,
        loading: profileLoading,
        error: profileError
    } = useProfile();

    const {
        interviews,
        loading: interviewsLoading,
        error: interviewsError
    } = useInterviews();

    const loading = profileLoading || interviewsLoading;
    const error = profileError || interviewsError;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Profile</h1>
                <p className="mt-1 text-muted-foreground">Your account and job-search summary</p>
            </div>

            {error ? (
                <Card className="mx-auto max-w-md">
                    <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                            <AlertCircle className="h-6 w-6" />
                        </span>
                        <p className="text-sm text-muted-foreground">{error}</p>
                    </CardContent>
                </Card>
            ) : loading ? (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        {[...Array(4)].map((_, i) => (
                            <Card key={i}>
                                <CardHeader><Skeleton className="h-4 w-24" /></CardHeader>
                                <CardContent><Skeleton className="h-8 w-16" /></CardContent>
                            </Card>
                        ))}
                    </div>
                    <Card>
                        <CardContent className="space-y-4 py-6">
                            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <ProfileDetail
                    profileData={profileData}
                    applications={applications}
                    interviews={interviews}
                />
            )}
        </div>
    );
}

export default Profile;
