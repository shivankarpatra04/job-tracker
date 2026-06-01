import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Building2, MapPin, ChevronRight, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { statusPill } from "../../lib/status";

const RecentApplications = ({ applications = [] }) => {
    return (
        <Card className="animate-fade-up">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-lg font-semibold">Recent Applications</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                    <Link to="/applications" className="text-muted-foreground">
                        View all <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                {applications.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 py-10 text-center">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
                            <FileText className="h-5 w-5" />
                        </span>
                        <p className="text-sm text-muted-foreground">No applications yet.</p>
                        <Button size="sm" asChild>
                            <Link to="/applications">Add your first application</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {applications.map((app) => (
                            <div
                                key={app._id}
                                className="-mx-2 flex items-center justify-between gap-4 rounded-lg px-2 py-3 transition-colors hover:bg-muted/60"
                            >
                                <div className="min-w-0 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                                        <span className="truncate font-medium">{app.company}</span>
                                    </div>
                                    <p className="truncate text-sm text-muted-foreground">{app.position}</p>
                                    {app.location && (
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <MapPin className="mr-1 h-3.5 w-3.5" />
                                            {app.location}
                                        </div>
                                    )}
                                </div>
                                <div className="flex shrink-0 flex-col items-end gap-2">
                                    <span className={statusPill(app.status)}>{app.status}</span>
                                    <time className="text-xs text-muted-foreground tabular-nums">
                                        {new Date(app.applicationDate).toLocaleDateString()}
                                    </time>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default RecentApplications;
