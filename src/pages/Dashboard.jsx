import React, { useEffect } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { Stats } from '../components/dashboard/Stats';
import RecentApplications from '../components/dashboard/RecentApplications';
import Timeline from '../components/dashboard/Timeline';
import { Loader2 } from 'lucide-react';

export function Dashboard() {
    const {
        stats,
        recentApplications,
        timelineActivities,
        loading,
        error,
        refreshData
    } = useDashboard();

    // Add debug logging
    useEffect(() => {
        console.log('Dashboard data:', { stats, recentApplications, timelineActivities });
    }, [stats, recentApplications, timelineActivities]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] space-y-4">
                <p className="text-red-500">Error loading dashboard: {error}</p>
                <button
                    onClick={refreshData}
                    className="text-sm text-blue-500 hover:underline"
                >
                    Try again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <p className="text-muted-foreground">
                        Your job search overview
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={refreshData}
                        className="text-sm text-blue-500 hover:underline"
                    >
                        Refresh
                    </button>
                    <div className="text-sm text-muted-foreground">
                        Last updated: {new Date().toLocaleString()}
                    </div>
                </div>
            </div>

            {/* Stats Cards with error boundary */}
            {stats ? (
                <Stats stats={stats} />
            ) : (
                <div className="text-center text-gray-500">
                    No statistics available
                </div>
            )}

            {/* Two Column Layout */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Recent Applications Section */}
                <div>
                    <RecentApplications
                        applications={recentApplications}
                        isLoading={loading}
                    />
                </div>
                {/* Activity Timeline */}
                <div>
                    <Timeline
                        activities={timelineActivities}
                        isLoading={loading}
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;