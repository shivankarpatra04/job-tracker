import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { Stats } from '../components/dashboard/Stats';
import RecentApplications from '../components/dashboard/RecentApplications';
import Timeline from '../components/dashboard/Timeline';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { Button } from '../components/ui/button';
import { RefreshCw, AlertCircle } from 'lucide-react';

function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-9 w-9 rounded-lg" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-16" />
                            <Skeleton className="mt-2 h-3 w-28" />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                {[...Array(2)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-5 w-40" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[...Array(4)].map((_, j) => (
                                <Skeleton key={j} className="h-12 w-full" />
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export function Dashboard() {
    const {
        stats,
        recentApplications,
        timelineActivities,
        loading,
        error,
        refreshData
    } = useDashboard();

    if (error) {
        return (
            <Card className="mx-auto max-w-md animate-scale-in">
                <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                        <AlertCircle className="h-6 w-6" />
                    </span>
                    <div>
                        <p className="font-semibold">Couldn't load your dashboard</p>
                        <p className="mt-1 text-sm text-muted-foreground">{error}</p>
                    </div>
                    <Button onClick={refreshData} variant="outline">
                        <RefreshCw className="mr-2 h-4 w-4" /> Try again
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Dashboard</h1>
                    <p className="mt-1 text-muted-foreground">
                        Your job search at a glance
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="hidden text-xs text-muted-foreground sm:inline">
                        Updated {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <Button onClick={refreshData} variant="outline" size="sm" disabled={loading}>
                        <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                </div>
            </div>

            {loading ? (
                <DashboardSkeleton />
            ) : (
                <>
                    {stats ? (
                        <Stats stats={stats} />
                    ) : (
                        <Card>
                            <CardContent className="py-8 text-center text-muted-foreground">
                                No statistics available yet.
                            </CardContent>
                        </Card>
                    )}

                    <div className="grid gap-6 md:grid-cols-2">
                        <RecentApplications applications={recentApplications} isLoading={loading} />
                        <Timeline activities={timelineActivities} isLoading={loading} />
                    </div>
                </>
            )}
        </div>
    );
}

export default Dashboard;
