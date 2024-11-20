// components/profile/ProfileDetail.jsx
import React from 'react';
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
    MapPin, Mail, Phone, Building, Calendar, Clock
} from 'lucide-react';

export function ProfileDetail({ profileData, applications = [], interviews = [] }) {
    const {
        personal = {}
    } = profileData || {};

    // Calculate application statistics
    const applicationStats = {
        total: applications.length,
        applied: applications.filter(app => app.status === 'Applied').length,
        interviewing: applications.filter(app => app.status === 'Interview').length,
        offered: applications.filter(app => app.status === 'Offer').length,
        accepted: applications.filter(app => app.status === 'Accepted').length,
        rejected: applications.filter(app => app.status === 'Rejected').length
    };

    // Calculate interview statistics
    const interviewStats = {
        total: interviews.length,
        scheduled: interviews.filter(interview => interview.status === 'Scheduled').length,
        completed: interviews.filter(interview => interview.status === 'Completed').length,
    };

    // Calculate response rate
    const responseRate = applicationStats.total > 0
        ? Math.round(((applicationStats.interviewing + applicationStats.offered) / applicationStats.total) * 100)
        : 0;

    // Get upcoming interviews sorted by date
    const upcomingInterviews = interviews
        .filter(interview => interview.status === 'Scheduled')
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    console.log('Stats:', { applicationStats, interviewStats, interviews }); // Debug log

    return (
        <div className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <div className="p-6">
                        <h3 className="text-sm font-medium text-gray-500">Total Applications</h3>
                        <p className="text-2xl font-bold">{applicationStats.total}</p>
                    </div>
                </Card>
                <Card>
                    <div className="p-6">
                        <h3 className="text-sm font-medium text-gray-500">Interviewing</h3>
                        <p className="text-2xl font-bold">{interviewStats.scheduled}</p>
                        <p className="text-sm text-gray-500">
                            {interviewStats.completed} completed
                        </p>
                    </div>
                </Card>
                <Card>
                    <div className="p-6">
                        <h3 className="text-sm font-medium text-gray-500">Offers</h3>
                        <p className="text-2xl font-bold">{applicationStats.offered}</p>
                    </div>
                </Card>
                <Card>
                    <div className="p-6">
                        <h3 className="text-sm font-medium text-gray-500">Response Rate</h3>
                        <p className="text-2xl font-bold">{responseRate}%</p>
                    </div>
                </Card>
            </div>

            {/* Personal Information */}
            <Card>
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Mail className="h-4 w-4 text-gray-500 mr-2" />
                                <span>{personal.email || 'No email provided'}</span>
                            </div>
                            {personal.phone && (
                                <div className="flex items-center">
                                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                                    <span>{personal.phone}</span>
                                </div>
                            )}
                            {personal.location && (
                                <div className="flex items-center">
                                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                                    <span>{personal.location}</span>
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center mb-2">
                                <Building className="h-4 w-4 text-gray-500 mr-2" />
                                <span className="font-medium">
                                    {personal.firstName} {personal.lastName}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Recent Applications */}
            <Card>
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Applications</h3>
                    <div className="space-y-4">
                        {applications.length > 0 ? (
                            applications.slice(0, 5).map((application) => (
                                <div key={application._id} className="flex items-center justify-between py-2 border-b last:border-0">
                                    <div className="flex-1">
                                        <p className="font-medium">{application.company}</p>
                                        <p className="text-sm text-gray-600">{application.position}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-gray-500">
                                            {new Date(application.applicationDate).toLocaleDateString()}
                                        </span>
                                        <Badge variant={
                                            application.status === 'Offered' ? 'success' :
                                                application.status === 'Rejected' ? 'destructive' :
                                                    application.status === 'Interview' ? 'warning' : 'secondary'
                                        }>
                                            {application.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-4">No applications yet</p>
                        )}
                    </div>
                </div>
            </Card>

            {/* Upcoming Interviews */}
            <Card>
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Upcoming Interviews ({interviewStats.scheduled})
                    </h3>
                    <div className="space-y-4">
                        {upcomingInterviews.length > 0 ? (
                            upcomingInterviews.map((interview) => (
                                <div key={interview._id} className="flex items-center justify-between py-2 border-b last:border-0">
                                    <div className="flex-1">
                                        <p className="font-medium">
                                            {interview.application?.company || 'Company'}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {interview.type} Interview
                                        </p>
                                        {interview.platform && (
                                            <p className="text-sm text-gray-500">
                                                via {interview.platform}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                {new Date(interview.date).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Clock className="h-3 w-3 mr-1" />
                                                {new Date(interview.date).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-4">
                                No upcoming interviews scheduled
                            </p>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
}