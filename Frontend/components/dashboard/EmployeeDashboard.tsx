"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Clock, Calendar, CheckCircle2, XCircle, FileText, UserCircle, LogOut, ArrowRight, Plane } from "lucide-react";
import { useState, useEffect } from "react";
import { MOCK_ATTENDANCE } from "@/lib/mockData";
import Link from "next/link";

export function EmployeeDashboard() {
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleAttendance = () => {
        setIsCheckedIn(!isCheckedIn);
        // In real app, call API
    };

    // Mock upcoming holidays
    const upcomingHolidays = [
        { date: "Oct 24", name: "Dussehra", day: "Tuesday" },
        { date: "Nov 12", name: "Diwali", day: "Sunday" },
        { date: "Dec 25", name: "Christmas", day: "Monday" },
    ];

    // Get recent activity (last 3 records)
    const recentActivity = MOCK_ATTENDANCE.slice(0, 3);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Welcome & Timer Card */}
                <Card className="flex-1 bg-gradient-to-br from-primary/90 to-primary text-primary-foreground border-none shadow-lg">
                    <CardContent className="p-8 flex flex-col justify-between h-full">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Good Morning, John!</h2>
                            <p className="text-primary-foreground/80">You have a meeting at 10:00 AM.</p>
                        </div>
                        <div className="mt-8">
                            <div className="text-5xl font-mono font-bold tracking-tighter">
                                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <p className="mt-2 text-primary-foreground/70">{time.toDateString()}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Attendance */}
                <Card className="flex-1 md:max-w-sm">
                    <CardHeader>
                        <CardTitle>Quick Attendance</CardTitle>
                        <CardDescription>Mark your daily attendance.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center space-y-4">
                        <Button
                            size="lg"
                            className={`w-full h-16 text-lg ${isCheckedIn ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                            onClick={handleAttendance}
                        >
                            {isCheckedIn ? <XCircle className="mr-2 h-6 w-6" /> : <CheckCircle2 className="mr-2 h-6 w-6" />}
                            {isCheckedIn ? "Check Out" : "Check In"}
                        </Button>
                        <div className="flex justify-between w-full text-sm text-muted-foreground px-2">
                            <span>Check In: {isCheckedIn ? "09:00 AM" : "--:--"}</span>
                            <span>Check Out: --:--</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                            <Clock className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Hours</p>
                            <h4 className="text-xl font-bold">142 hrs</h4>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600">
                            <Calendar className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Leave Balance</p>
                            <h4 className="text-xl font-bold">12 Days</h4>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">On Time Arrival</p>
                            <h4 className="text-xl font-bold">95%</h4>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Recent Activity */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Your latest attendance records.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.map((activity, i) => (
                                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-full ${activity.status === 'PRESENT' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                            {activity.status === 'PRESENT' ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{activity.date}</p>
                                            <p className="text-xs text-muted-foreground">{activity.status}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">{activity.checkIn || '--:--'} - {activity.checkOut || '--:--'}</p>
                                        <p className="text-xs text-muted-foreground">9 hrs</p>
                                    </div>
                                </div>
                            ))}
                            <Link href="/attendance" className="block w-full">
                                <Button variant="outline" className="w-full mt-2">View All Activity <ArrowRight className="ml-2 h-4 w-4" /></Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Right Column: Quick Actions & Holidays */}
                <div className="col-span-3 space-y-6">
                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <Link href="/leaves">
                                <Button variant="outline" className="w-full h-20 flex flex-col gap-2 hover:bg-primary/5 hover:text-primary hover:border-primary/20">
                                    <Plane className="h-6 w-6 mb-1" />
                                    Apply Leave
                                </Button>
                            </Link>
                            <Link href="/payroll">
                                <Button variant="outline" className="w-full h-20 flex flex-col gap-2 hover:bg-primary/5 hover:text-primary hover:border-primary/20">
                                    <FileText className="h-6 w-6 mb-1" />
                                    Payslips
                                </Button>
                            </Link>
                            <Link href="/profile">
                                <Button variant="outline" className="w-full h-20 flex flex-col gap-2 hover:bg-primary/5 hover:text-primary hover:border-primary/20">
                                    <UserCircle className="h-6 w-6 mb-1" />
                                    Profile
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" className="w-full h-20 flex flex-col gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200">
                                    <LogOut className="h-6 w-6 mb-1" />
                                    Log Out
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Upcoming Holidays */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Holidays</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {upcomingHolidays.map((holiday, i) => (
                                    <li key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary text-xs font-bold uppercase">
                                                <span>{holiday.date.split(' ')[0]}</span>
                                                <span>{holiday.date.split(' ')[1]}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{holiday.name}</p>
                                                <p className="text-xs text-muted-foreground">{holiday.day}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
