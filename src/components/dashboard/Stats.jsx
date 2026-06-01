import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
    Briefcase, Calendar, CheckCircle, XCircle, TrendingUp, TrendingDown
} from "lucide-react";

export function Stats({ stats }) {
    const statCards = [
        {
            title: "Total Applications",
            value: stats?.applications?.total || 0,
            change: stats?.applications?.weeklyChangeText || '0 new this week',
            trend: "up",
            icon: Briefcase,
            iconWrap: "bg-blue-50 text-blue-600",
        },
        {
            title: "Interviews",
            value: stats?.interviews?.upcoming || 0,
            change: stats?.interviews?.upcomingText || '0 interviews scheduled',
            trend: "up",
            icon: Calendar,
            iconWrap: "bg-violet-50 text-violet-600",
        },
        {
            title: "Offers",
            value: stats?.offers?.total || 0,
            change: stats?.offers?.pendingText || '0 pending',
            trend: "up",
            icon: CheckCircle,
            iconWrap: "bg-emerald-50 text-emerald-600",
        },
        {
            title: "Rejections",
            value: stats?.rejections?.total || 0,
            change: stats?.rejections?.weeklyChangeText || '0 this week',
            trend: "down",
            icon: XCircle,
            iconWrap: "bg-rose-50 text-rose-600",
        }
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat, i) => (
                <Card
                    key={stat.title}
                    className="animate-fade-up transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                    style={{ animationDelay: `${i * 70}ms` }}
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {stat.title}
                        </CardTitle>
                        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.iconWrap}`}>
                            <stat.icon className="h-4 w-4" />
                        </span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold tabular-nums tracking-tight">{stat.value}</div>
                        <p className="mt-1 flex items-center text-xs text-muted-foreground">
                            {stat.trend === "up" ? (
                                <TrendingUp className="mr-1 h-3.5 w-3.5 text-emerald-500" />
                            ) : (
                                <TrendingDown className="mr-1 h-3.5 w-3.5 text-rose-500" />
                            )}
                            {stat.change}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
