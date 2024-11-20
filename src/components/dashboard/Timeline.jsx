import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import {
    Briefcase,
    Calendar,
    MapPin,
    User2,
    Video,
    CheckCircle,
    XCircle,
    Clock
} from "lucide-react";
import { format, isToday, isYesterday } from 'date-fns';

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

const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'applied':
            return 'bg-yellow-100 text-yellow-800';
        case 'interview':
            return 'bg-blue-100 text-blue-800';
        case 'offer':
            return 'bg-green-100 text-green-800';
        case 'rejected':
            return 'bg-red-100 text-red-800';
        case 'scheduled':
            return 'bg-purple-100 text-purple-800';
        case 'completed':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const formatDate = (date) => {
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
    if (!activities.length) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground py-8">
                        No recent activities
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative">
                    <div className="absolute left-0 top-0 h-full w-px bg-border ml-6" />

                    <div className="space-y-6">
                        {activities.map((activity, index) => {
                            const Icon = getActivityIcon(activity.type);

                            return (
                                <div key={index} className="relative pl-8">
                                    <div className="absolute left-0 rounded-full bg-background p-2 shadow">
                                        <Icon className="h-4 w-4 text-muted-foreground" />
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium">{activity.title}</h4>
                                            <Badge className={getStatusColor(activity.status)}>
                                                {activity.status}
                                            </Badge>
                                        </div>

                                        <p className="text-sm text-muted-foreground">
                                            {activity.subtitle}
                                        </p>

                                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                            <span className="flex items-center">
                                                <Clock className="mr-1 h-4 w-4" />
                                                {formatDate(activity.date)}
                                            </span>

                                            {activity.location && (
                                                <span className="flex items-center">
                                                    <MapPin className="mr-1 h-4 w-4" />
                                                    {activity.location}
                                                </span>
                                            )}

                                            {activity.platform && (
                                                <span className="flex items-center">
                                                    <Video className="mr-1 h-4 w-4" />
                                                    {activity.platform}
                                                </span>
                                            )}

                                            {activity.interviewer && (
                                                <span className="flex items-center">
                                                    <User2 className="mr-1 h-4 w-4" />
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
            </CardContent>
        </Card>
    );
};

export default Timeline;