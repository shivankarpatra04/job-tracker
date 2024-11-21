export const calculateStats = (applications = [], interviews = []) => {
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Calculate interview statistics
    const interviewStats = {
        total: interviews.length,
        scheduled: interviews.filter(interview => interview.status === 'Scheduled').length,
        completed: interviews.filter(interview => interview.status === 'Completed').length
    };

    return {
        applications: {
            total: applications.length,
            weeklyChangeText: `${applications.filter(app => new Date(app.createdAt) >= oneWeekAgo).length} new this week`
        },
        interviews: {
            total: interviewStats.total,
            upcoming: interviewStats.scheduled,
            upcomingText: `${interviewStats.scheduled} interviews scheduled`
        },
        offers: {
            total: applications.filter(app => ['Offer', 'Accepted'].includes(app.status)).length,
            pendingText: `${applications.filter(app => app.status === 'Offer').length} pending`
        },
        rejections: {
            total: applications.filter(app => app.status === 'Rejected').length,
            weeklyChangeText: `${applications.filter(app => app.status === 'Rejected' && new Date(app.createdAt) >= oneWeekAgo).length} this week`
        }
    };
};