// components/profile/ProfileDetail.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
    MapPin, Mail, Phone, Building, Calendar, Clock, Briefcase, CheckCircle, Target
} from 'lucide-react';
import { statusPill } from "../../lib/status";

export function ProfileDetail({ profileData, applications = [], interviews = [] }) {
    const { personal = {} } = profileData || {};

    const applicationStats = {
        total: applications.length,
        applied: applications.filter(app => app.status === 'Applied').length,
        interviewing: applications.filter(app => app.status === 'Interview').length,
        offered: applications.filter(app => app.status === 'Offer').length,
        accepted: applications.filter(app => app.status === 'Accepted').length,
        rejected: applications.filter(app => app.status === 'Rejected').length
    };

    const interviewStats = {
        total: interviews.length,
        scheduled: interviews.filter(interview => interview.status === 'Scheduled').length,
        completed: interviews.filter(interview => interview.status === 'Completed').length,
    };

    const responseRate = applicationStats.total > 0
        ? Math.round(((applicationStats.interviewing + applicationStats.offered) / applicationStats.total) * 100)
        : 0;

    const upcomingInterviews = interviews
        .filter(interview => interview.status === 'Scheduled')
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const fullName = `${personal.firstName || ''} ${personal.lastName || ''}`.trim() || 'Your account';
    const initials = (personal.firstName?.[0] || personal.email?.[0] || 'U').toUpperCase();

    const overviewCards = [
        { label: 'Total Applications', value: applicationStats.total, sub: null, icon: Briefcase, wrap: 'bg-blue-50 text-blue-600' },
        { label: 'Interviewing', value: interviewStats.scheduled, sub: `${interviewStats.completed} completed`, icon: Calendar, wrap: 'bg-violet-50 text-violet-600' },
        { label: 'Offers', value: applicationStats.offered, sub: null, icon: CheckCircle, wrap: 'bg-emerald-50 text-emerald-600' },
        { label: 'Response Rate', value: `${responseRate}%`, sub: null, icon: Target, wrap: 'bg-amber-50 text-amber-600' },
    ];

    return (
        <div className="space-y-6">
            {/* Identity header */}
            <Card className="animate-fade-up">
                <CardContent className="flex items-center gap-4 py-6">
                    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-2xl font-bold text-white shadow-glow">
                        {initials}
                    </span>
                    <div className="min-w-0">
                        <h2 className="truncate text-xl font-semibold">{fullName}</h2>
                        <p className="truncate text-sm text-muted-foreground">{personal.email || 'No email provided'}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                {overviewCards.map((c, i) => (
                    <Card
                        key={c.label}
                        className="animate-fade-up transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                        style={{ animationDelay: `${i * 60}ms` }}
                    >
                        <CardContent className="py-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-muted-foreground">{c.label}</h3>
                                <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${c.wrap}`}>
                                    <c.icon className="h-4 w-4" />
                                </span>
                            </div>
                            <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight">{c.value}</p>
                            {c.sub && <p className="mt-1 text-xs text-muted-foreground">{c.sub}</p>}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Personal Information */}
            <Card>
                <CardHeader><CardTitle className="text-lg font-semibold">Personal Information</CardTitle></CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-2 text-sm">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{personal.firstName} {personal.lastName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{personal.email || 'No email provided'}</span>
                        </div>
                        {personal.phone && (
                            <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{personal.phone}</span>
                            </div>
                        )}
                        {personal.location && (
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{personal.location}</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Recent Applications */}
            <Card>
                <CardHeader><CardTitle className="text-lg font-semibold">Recent Applications</CardTitle></CardHeader>
                <CardContent>
                    {applications.length > 0 ? (
                        <div className="space-y-1">
                            {applications.slice(0, 5).map((application) => (
                                <div key={application._id} className="-mx-2 flex items-center justify-between gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted/60">
                                    <div className="min-w-0">
                                        <p className="truncate font-medium">{application.company}</p>
                                        <p className="truncate text-sm text-muted-foreground">{application.position}</p>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-3">
                                        <span className="text-xs text-muted-foreground tabular-nums">
                                            {new Date(application.applicationDate).toLocaleDateString()}
                                        </span>
                                        <span className={statusPill(application.status)}>{application.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="py-6 text-center text-sm text-muted-foreground">No applications yet</p>
                    )}
                </CardContent>
            </Card>

            {/* Upcoming Interviews */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                        Upcoming Interviews ({interviewStats.scheduled})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {upcomingInterviews.length > 0 ? (
                        <div className="space-y-1">
                            {upcomingInterviews.map((interview) => (
                                <div key={interview._id} className="-mx-2 flex items-center justify-between gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted/60">
                                    <div className="min-w-0">
                                        <p className="truncate font-medium">{interview.application?.company || 'Company'}</p>
                                        <p className="truncate text-sm text-muted-foreground">
                                            {interview.type} Interview{interview.platform ? ` · via ${interview.platform}` : ''}
                                        </p>
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <div className="flex items-center justify-end text-xs text-muted-foreground tabular-nums">
                                            <Calendar className="mr-1 h-3 w-3" />
                                            {new Date(interview.date).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center justify-end text-xs text-muted-foreground tabular-nums">
                                            <Clock className="mr-1 h-3 w-3" />
                                            {new Date(interview.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="py-6 text-center text-sm text-muted-foreground">No upcoming interviews scheduled</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
