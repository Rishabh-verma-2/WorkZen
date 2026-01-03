"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, UserCheck, CalendarOff, AlertCircle, TrendingUp } from "lucide-react";
import { MOCK_USERS, MOCK_ATTENDANCE } from "@/lib/mockData";

export function AdminDashboard() {
    const totalEmployees = MOCK_USERS.filter(u => u.role === "EMPLOYEE").length;
    // Mock calculations for today
    const presentToday = 12; // Static mock for visual
    const onLeave = 2; // Static mock
    const pendingLeaves = 3;

    const stats = [
        {
            title: "Total Employees",
            value: totalEmployees,
            icon: Users,
            trend: "+2 this month",
            color: "text-blue-500",
            bg: "bg-blue-50 dark:bg-blue-900/20",
        },
        {
            title: "Present Today",
            value: presentToday,
            icon: UserCheck,
            trend: "92% attendance",
            color: "text-green-500",
            bg: "bg-green-50 dark:bg-green-900/20",
        },
        {
            title: "On Leave",
            value: onLeave,
            icon: CalendarOff,
            trend: "Planned leaves",
            color: "text-orange-500",
            bg: "bg-orange-50 dark:bg-orange-900/20",
        },
        {
            title: "Pending Requests",
            value: pendingLeaves,
            icon: AlertCircle,
            trend: "Requires action",
            color: "text-red-500",
            bg: "bg-red-50 dark:bg-red-900/20",
        },
    ];

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                <div className="flex items-end gap-2">
                                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                                    <span className="text-xs text-muted-foreground mb-1">{stat.trend}</span>
                                </div>
                            </div>
                            <div className={`p-3 rounded-full ${stat.bg}`}>
                                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Attendance Overview</CardTitle>
                        <CardDescription>Weekly attendance trends.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] flex items-center justify-center text-muted-foreground bg-muted/20 rounded-lg">
                            <TrendingUp className="mr-2 h-4 w-4" />
                            Chart Placeholder (Chart.js / Recharts)
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest system updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                                    <span className="relative flex h-2 w-2 translate-y-1.5 rounded-full bg-primary" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            John Doe checked in
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            2 minutes ago
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
