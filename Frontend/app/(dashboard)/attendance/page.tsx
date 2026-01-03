"use client";

import { useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { MOCK_ATTENDANCE } from "@/lib/mockData";
import { CheckCircle2, Clock, MapPin } from "lucide-react";

export default function AttendancePage() {
    const [viewAll, setViewAll] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    });

    const { user } = useAuth();

    if (!user) return null;

    // Filter attendance based on role
    const allAttendance = user.role === "ADMIN"
        ? MOCK_ATTENDANCE
        : MOCK_ATTENDANCE.filter(a => a.userId === user.id);

    // Filter for specific month when in viewAll mode
    const filteredAttendance = viewAll
        ? allAttendance.filter(record => record.date.startsWith(selectedMonth))
        : allAttendance.slice(0, 5); // Show only recent 5 in default view

    // Generate last 12 months for dropdown
    const months = Array.from({ length: 12 }, (_, i) => {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        return {
            value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
            label: d.toLocaleDateString('default', { month: 'long', year: 'numeric' })
        };
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight gradient-text">Attendance</h1>
                    <p className="text-muted-foreground">Manage and view attendance records.</p>
                </div>
                <div className="flex items-center gap-2">
                    {user.role === "EMPLOYEE" && !viewAll && (
                        <Button>
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Check In
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card className={viewAll ? "md:col-span-4" : "md:col-span-3"}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="space-y-1">
                            <CardTitle>Attendance History</CardTitle>
                            <CardDescription>
                                {user.role === "ADMIN" ? "All employee records" : "Your past attendance records"}
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            {viewAll ? (
                                <>
                                    <select
                                        className="h-9 w-[180px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(e.target.value)}
                                    >
                                        {months.map(m => (
                                            <option key={m.value} value={m.value}>{m.label}</option>
                                        ))}
                                    </select>
                                    <Button variant="outline" size="sm" onClick={() => setViewAll(false)}>
                                        Back
                                    </Button>
                                </>
                            ) : (
                                <Button variant="outline" size="sm" onClick={() => setViewAll(true)}>
                                    View All
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="mt-4">
                        <div className="rounded-md border">
                            <div className="grid grid-cols-5 p-4 bg-muted/50 font-medium text-sm">
                                <div>Date</div>
                                {user.role === "ADMIN" && <div>Employee</div>}
                                <div>Check In</div>
                                <div>Check Out</div>
                                <div>Status</div>
                            </div>
                            {filteredAttendance.length > 0 ? (
                                filteredAttendance.map((record) => (
                                    <div key={record.id} className="grid grid-cols-5 p-4 border-t text-sm items-center hover:bg-muted/20 transition-colors">
                                        <div className="font-mono text-muted-foreground">{record.date}</div>
                                        {user.role === "ADMIN" && <div className="font-medium text-primary">User {record.userId}</div>}
                                        <div className="flex items-center gap-2">
                                            {record.checkIn ? <Clock className="h-3 w-3 text-green-500" /> : null}
                                            {record.checkIn || "--:--"}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {record.checkOut ? <Clock className="h-3 w-3 text-orange-500" /> : null}
                                            {record.checkOut || "--:--"}
                                        </div>
                                        <div>
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                                        ${record.status === 'PRESENT' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                    record.status === 'ABSENT' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                                {record.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-muted-foreground">No records found for this period.</div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {!viewAll && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20">
                                <div className="text-sm text-green-600 dark:text-green-400 font-medium">Present Days</div>
                                <div className="text-3xl font-bold text-green-700 dark:text-green-300">22</div>
                                <div className="text-xs text-green-600/80">This Month</div>
                            </div>
                            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
                                <div className="text-sm text-red-600 dark:text-red-400 font-medium">Absences</div>
                                <div className="text-3xl font-bold text-red-700 dark:text-red-300">1</div>
                                <div className="text-xs text-red-600/80">This Month</div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
