"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { MOCK_LEAVES, LeaveRequest } from "@/lib/mockData";
import { useState } from "react";
import { Plus, Check, X } from "lucide-react";

export default function LeavesPage() {
    const { user } = useAuth();
    const [leaves, setLeaves] = useState<LeaveRequest[]>(MOCK_LEAVES);
    const [showApplyForm, setShowApplyForm] = useState(false);

    // Mock Form State
    const [leaveType, setLeaveType] = useState("PAID");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");

    if (!user) return null;

    const userLeaves = user.role === "ADMIN" ? leaves : leaves.filter(l => l.userId === user.id);

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();
        const newLeave: LeaveRequest = {
            id: `lv_${Date.now()}`,
            userId: user.id,
            type: leaveType as any,
            startDate,
            endDate,
            reason,
            status: "PENDING",
            createdAt: new Date().toISOString().split('T')[0]
        };
        setLeaves([...leaves, newLeave]);
        setShowApplyForm(false);
        alert("Leave request submitted!");
    };

    const handleAction = (id: string, action: "APPROVED" | "REJECTED") => {
        setLeaves(leaves.map(l => l.id === id ? { ...l, status: action } : l));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight gradient-text">Leave Management</h1>
                    <p className="text-muted-foreground">Apply for leaves and track status.</p>
                </div>
                {user.role === "EMPLOYEE" && (
                    <Button onClick={() => setShowApplyForm(!showApplyForm)}>
                        <Plus className="mr-2 h-4 w-4" /> Apply for Leave
                    </Button>
                )}
            </div>

            {showApplyForm && (
                <Card className="border-primary/50 shadow-lg">
                    <CardHeader>
                        <CardTitle>New Leave Request</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleApply} className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Leave Type</Label>
                                <select
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    value={leaveType}
                                    onChange={(e) => setLeaveType(e.target.value)}
                                >
                                    <option value="PAID">Paid Leave</option>
                                    <option value="SICK">Sick Leave</option>
                                    <option value="UNPAID">Unpaid Leave</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label>Reason</Label>
                                <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Why do you need leave?" required />
                            </div>
                            <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                            </div>
                            <div className="md:col-span-2 flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => setShowApplyForm(false)}>Cancel</Button>
                                <Button type="submit">Submit Request</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4">
                {userLeaves.map((leave) => (
                    <Card key={leave.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded text-xs font-bold 
                                ${leave.type === 'SICK' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {leave.type}
                                    </span>
                                    <span className="font-semibold text-lg">{leave.startDate} to {leave.endDate}</span>
                                </div>
                                <p className="text-muted-foreground">{leave.reason}</p>
                                {user.role === "ADMIN" && <p className="text-xs text-primary">Requested by User ID: {leave.userId}</p>}
                            </div>

                            <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium border
                            ${leave.status === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-200' :
                                        leave.status === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200' :
                                            'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                                    {leave.status}
                                </span>

                                {user.role === "ADMIN" && leave.status === "PENDING" && (
                                    <div className="flex gap-2">
                                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleAction(leave.id, "APPROVED")}>
                                            <Check className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleAction(leave.id, "REJECTED")}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
                {userLeaves.length === 0 && <p className="text-center text-muted-foreground py-8">No leave requests found.</p>}
            </div>
        </div>
    );
}
