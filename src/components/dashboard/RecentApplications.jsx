import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Building2, MapPin, ChevronRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const RecentApplications = ({ applications = [] }) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-bold">Recent Applications</CardTitle>
                <Button variant="link" asChild>
                    <Link to="/applications" className="flex items-center text-sm text-muted-foreground">
                        View all <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {applications.map((app) => (
                        <div
                            key={app._id}
                            className="flex items-center justify-between space-x-4"
                        >
                            <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">{app.company}</span>
                                </div>
                                <h4 className="text-sm font-medium">
                                    {app.position}
                                </h4>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <MapPin className="mr-1 h-4 w-4" />
                                    {app.location}
                                </div>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                                <Badge
                                    variant="secondary"
                                    className={
                                        app.status === 'Interview' ? 'bg-blue-100 text-blue-800' :
                                            app.status === 'Applied' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                    }
                                >
                                    {app.status}
                                </Badge>
                                <time className="text-sm text-muted-foreground">
                                    {new Date(app.applicationDate).toLocaleDateString()}
                                </time>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default RecentApplications;