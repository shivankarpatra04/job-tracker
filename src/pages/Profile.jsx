// pages/Profile.jsx
import React from 'react';
import { useProfile } from '../hooks/useProfile';
import { useInterviews } from '../hooks/useInterviews';
import { ProfileDetail } from '../components/profile/ProfileDetail';

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

    // Debug logs
    console.log('Profile Data:', { profileData, applications, interviews });

    if (profileLoading || interviewsLoading) return <div>Loading...</div>;
    if (profileError || interviewsError) return <div>Error: {profileError || interviewsError}</div>;

    return (
        <div className="container mx-auto py-8 px-4">
            <ProfileDetail
                profileData={profileData}
                applications={applications}
                interviews={interviews}
            />
        </div>
    );
}