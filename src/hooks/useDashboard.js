import { useState, useEffect } from 'react';
import axios from 'axios';
import { calculateStats } from '../utils/statsCalculator';

const API_URL = process.env.REACT_APP_API_URL;

export const useDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        stats: {
            applications: { total: 0, weeklyChangeText: "No changes" },
            interviews: { total: 0, upcoming: 0, upcomingText: "No interviews scheduled" },
            offers: { total: 0, pendingText: "No pending" },
            rejections: { total: 0, weeklyChangeText: "No changes" }
        },
        applications: [],
        interviews: [],
        recentApplications: [],
        upcomingInterviews: [],
        timelineActivities: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const generateTimelineActivities = (applications, interviews) => {
        const activities = [
            ...applications.map(app => ({
                type: 'application',
                date: app.createdAt,
                data: {
                    company: app.company,
                    position: app.position,
                    status: app.status
                }
            })),
            ...interviews.map(int => ({
                type: 'interview',
                date: int.date,
                data: {
                    company: int.application?.company,
                    position: int.application?.position,
                    interviewType: int.type,
                    status: int.status
                }
            }))
        ];

        return activities.sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            const [applicationsRes, interviewsRes] = await Promise.all([
                axios.get(`${API_URL}/applications`, { headers }),
                axios.get(`${API_URL}/interviews`, { headers })
            ]);

            const applications = applicationsRes.data.data;
            const interviews = interviewsRes.data.data;

            const stats = calculateStats(applications, interviews);
            const timelineActivities = generateTimelineActivities(applications, interviews);

            console.log('Dashboard Data:', {
                applications,
                interviews,
                stats,
                timelineActivities
            });

            setDashboardData({
                stats,
                applications,
                interviews,
                recentApplications: applications
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 5),
                upcomingInterviews: interviews
                    .filter(interview =>
                        interview.status === 'Scheduled' &&
                        new Date(interview.date) > new Date()
                    )
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .slice(0, 5),
                timelineActivities: timelineActivities.slice(0, 10)
            });
        } catch (err) {
            console.error('Dashboard fetch error:', err);
            setError(err.message || 'Failed to load dashboard');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
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