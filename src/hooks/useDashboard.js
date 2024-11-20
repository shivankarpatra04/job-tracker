import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const useDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        stats: {
            applications: {
                total: 0,
                weeklyChange: 0,
                weeklyChangeText: "No changes"
            },
            interviews: {
                total: 0,
                upcoming: 0,
                upcomingText: "No upcoming"
            },
            offers: {
                total: 0,
                pending: 0,
                pendingText: "No pending"
            },
            rejections: {
                total: 0,
                weeklyChange: 0,
                weeklyChangeText: "No changes"
            }
        },
        recentApplications: [],
        upcomingInterviews: [],
        timelineActivities: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            // Fetch all dashboard data in parallel
            const [statsRes, activityRes, timelineRes] = await Promise.all([
                axios.get(`${API_URL}/dashboard/stats`, { headers }),
                axios.get(`${API_URL}/dashboard/activity`, { headers }),
                axios.get(`${API_URL}/dashboard/timeline`, { headers })
            ]);

            // Log the responses for debugging
            console.log('Stats Response:', statsRes.data);
            console.log('Activity Response:', activityRes.data);
            console.log('Timeline Response:', timelineRes.data);

            setDashboardData({
                stats: statsRes.data.data,
                ...activityRes.data.data,
                timelineActivities: timelineRes.data.data
            });
            setError(null);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError(err.message || 'Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Refresh every 5 minutes
    useEffect(() => {
        const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return {
        ...dashboardData,
        loading,
        error,
        refreshData: fetchDashboardData
    };
};