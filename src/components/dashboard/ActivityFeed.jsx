import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Building2, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import { format } from "date-fns";

const getActivityIcon = (type) => {
    switch (type) {
        case 'application':
            return Building2;
        case 'interview':
            return Calendar;
        case 'offer':
            return CheckCircle;
        case 'rejection':
            return XCircle;
        default:
            return Building2;
    }
};

const ActivityFeed = ({ activities = [] }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity, index) => {
                        const Icon = getActivityIcon(activity.type);
                        return (
                            <div key={index} className="flex items-start space-x-4">
                                <div className="rounded-full bg-muted p-2">
                                    <Icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {activity.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {activity.description}
                                    </p>
                                    <div className="flex items-center space-x-2">
                                        <time className="text-xs text-muted-foreground">
                                            {format(new Date(activity.date), "MMM d, yyyy 'at' h:mm a")}
                                        </time>
                                        {activity.status && (
                                            <Badge
                                                variant="secondary"
                                                className={
                                                    activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                        activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'
                                                }
                                            >
                                                {activity.status}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default ActivityFeed;