import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar, Clock } from "lucide-react";

export function UpcomingInterviews({ interviews = [] }) {
    const upcomingInterviews = interviews
        .filter(int => int.status === 'Scheduled' && new Date(int.date) >= new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    Upcoming Interviews ({upcomingInterviews.length})
                </CardTitle>
            </CardHeader>
            <CardContent>
                {upcomingInterviews.length > 0 ? (
                    <div className="space-y-4">
                        {upcomingInterviews.map((interview, index) => (
                            <div key={interview._id || index} className="flex justify-between items-start border-b last:border-b-0 pb-3">
                                <div>
                                    <p className="font-medium">{interview.application?.company}</p>
                                    <p className="text-sm text-muted-foreground">{interview.type} Interview</p>
                                    {interview.platform && (
                                        <p className="text-sm text-muted-foreground">via {interview.platform}</p>
                                    )}
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center text-sm">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {new Date(interview.date).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {new Date(interview.date).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground py-4">
                        No upcoming interviews scheduled
                    </p>
                )}
            </CardContent>
        </Card>
    );
}