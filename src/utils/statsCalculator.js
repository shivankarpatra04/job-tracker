// utils/statsCalculator.js
export const calculateStats = (applications = [], interviews = []) => {
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Application stats
    const totalApplications = applications.length;
    const recentApplications = applications.filter(app =>
        new Date(app.applicationDate) >= oneWeekAgo
    ).length;

    // Interview stats
    const scheduledInterviews = interviews.filter(int =>
        int.status === 'Scheduled'
    ).length;
    const upcomingInterviews = interviews.filter(int =>
        int.status === 'Scheduled' && new Date(int.date) > currentDate
    ).length;

    // Offer stats
    const totalOffers = applications.filter(app =>
        app.status === 'Offer' || app.status === 'Accepted'
    ).length;
    const pendingOffers = applications.filter(app =>
        app.status === 'Offer'
    ).length;

    // Rejection stats
    const totalRejections = applications.filter(app =>
        app.status === 'Rejected'
    ).length;
    const recentRejections = applications.filter(app =>
        app.status === 'Rejected' && new Date(app.applicationDate) >= oneWeekAgo
    ).length;

    return {
        applications: {
            total: totalApplications,
            weeklyChangeText: `${recentApplications} new this week`
        },
        interviews: {
            total: scheduledInterviews,
            upcomingText: `${upcomingInterviews} upcoming`
        },
        offers: {
            total: totalOffers,
            pendingText: pendingOffers > 0 ? `${pendingOffers} pending response` : 'No pending offers'
        },
        rejections: {
            total: totalRejections,
            weeklyChangeText: `${recentRejections} this week`
        }
    };
};