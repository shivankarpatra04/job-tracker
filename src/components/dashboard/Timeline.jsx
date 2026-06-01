import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
    Briefcase, Calendar, MapPin, User2, Video, CheckCircle, XCircle, Clock, Activity
} from "lucide-react";
import { format, isToday, isYesterday } from 'date-fns';
import { statusPill } from "../../lib/status";

const getActivityIcon = (type) => {
    switch (type) {
        case 'application':
            return Briefcase;
        case 'interview':
            return Calendar;
        case 'offer':
            return CheckCircle;
        case 'rejection':
            return XCircle;
        default:
            return Clock;
    }
};

const getIconWrap = (type) => {
    switch (type) {
        case 'application':
            return 'bg-blue-50 text-blue-600';
        case 'interview':
            return 'bg-violet-50 text-violet-600';
        case 'offer':
            return 'bg-emerald-50 text-emerald-600';
        case 'rejection':
            return 'bg-rose-50 text-rose-600';
        default:
            return 'bg-muted text-muted-foreground';
    }
};

const formatActivityData = (activity) => {
    if (activity.type === 'application') {
        return {
            title: `Applied to ${activity.data.company}`,
            subtitle: activity.data.position,
            status: activity.data.status
        };
    }
    if (activity.type === 'interview') {
        return {
            title: `Interview with ${activity.data.company}`,
            subtitle: activity.data.position,
            status: activity.data.status,
            platform: activity.data.interviewType
        };
    }
    return {
        title: 'Activity',
        subtitle: '',
        status: 'Unknown'
    };
};

const formatDate = (date) => {
    if (!date) return '';
    const dateObj = new Date(date);
    if (isToday(dateObj)) {
        return `Today at ${format(dateObj, 'h:mm a')}`;
    }
    if (isYesterday(dateObj)) {
        return `Yesterday at ${format(dateObj, 'h:mm a')}`;
    }
    return format(dateObj, 'MMM d, yyyy');
};

const Timeline = ({ activities = [] }) => {
    return (
        <Card className="animate-fade-up" style={{ animationDelay: '80ms' }}>
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold">Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
                {!activities.length ? (
                    <div className="flex flex-col items-center gap-3 py-10 text-center">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
                            <Activity className="h-5 w-5" />
                        </span>
                        <p className="text-sm text-muted-foreground">
                            No recent activity. Your applications and interviews will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="relative">
                        <div className="absolute bottom-2 left-[18px] top-2 w-px bg-gradient-to-b from-border via-border to-transparent" />
                        <div className="space-y-6">
                            {activities.map((activity, index) => {
                                const Icon = getActivityIcon(activity.type);
                                const formattedActivity = formatActivityData(activity);

                                return (
                                    <div
                                        key={index}
                                        className="relative animate-fade-up pl-12"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <div className={`absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full ring-4 ring-card ${getIconWrap(activity.type)}`}>
                                            <Icon className="h-4 w-4" />
                                        </div>

                                        <div className="flex flex-col space-y-1.5">
                                            <div className="flex items-start justify-between gap-2">
                                                <h4 className="font-medium leading-tight">{formattedActivity.title}</h4>
                                                <span className={statusPill(formattedActivity.status)}>
                                                    {formattedActivity.status}
                                                </span>
                                            </div>

                                            {formattedActivity.subtitle && (
                                                <p className="text-sm text-muted-foreground">
                                                    {formattedActivity.subtitle}
                                                </p>
                                            )}

                                            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                                                <span className="flex items-center">
                                                    <Clock className="mr-1 h-3.5 w-3.5" />
                                                    {formatDate(activity.date)}
                                                </span>
                                                {activity.location && (
                                                    <span className="flex items-center">
                                                        <MapPin className="mr-1 h-3.5 w-3.5" />
                                                        {activity.location}
                                                    </span>
                                                )}
                                                {formattedActivity.platform && (
                                                    <span className="flex items-center">
                                                        <Video className="mr-1 h-3.5 w-3.5" />
                                                        {formattedActivity.platform}
                                                    </span>
                                                )}
                                                {activity.interviewer && (
                                                    <span className="flex items-center">
                                                        <User2 className="mr-1 h-3.5 w-3.5" />
                                                        {activity.interviewer}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default Timeline;
