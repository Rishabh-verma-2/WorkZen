"use client";

import { useAuth } from "@/context/AuthContext";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { EmployeeDashboard } from "@/components/dashboard/EmployeeDashboard";

export default function DashboardPage() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight gradient-text">Dashboard</h1>
                <p className="text-muted-foreground">Overview of your activity and performance.</p>
            </div>

            {user.role === "ADMIN" ? <AdminDashboard /> : <EmployeeDashboard />}
        </div>
    );
}
