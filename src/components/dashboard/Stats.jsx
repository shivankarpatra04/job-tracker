// components/dashboard/Stats.jsx
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
    Briefcase,
    Calendar,
    CheckCircle,
    XCircle,
    TrendingUp,
    TrendingDown
} from "lucide-react";

export function Stats({ stats }) {
    const statCards = [
        {
            title: "Total Applications",
            value: stats?.applications?.total || 0,
            change: stats?.applications?.weeklyChangeText,
            trend: "up",
            icon: Briefcase,
            color: "text-blue-600"
        },
        {
            title: "Interviews Scheduled",
            value: stats?.interviews?.upcoming || 0,
            change: stats?.interviews?.upcomingText,
            trend: "up",
            icon: Calendar,
            color: "text-purple-600"
        },
        {
            title: "Offers Received",
            value: stats?.offers?.total || 0,
            change: stats?.offers?.pendingText,
            trend: "up",
            icon: CheckCircle,
            color: "text-green-600"
        },
        {
            title: "Rejections",
            value: stats?.rejections?.total || 0,
            change: stats?.rejections?.weeklyChangeText,
            trend: "down",
            icon: XCircle,
            color: "text-red-600"
        }
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                            {stat.trend === "up" ? (
                                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                            ) : (
                                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                            )}
                            {stat.change}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
