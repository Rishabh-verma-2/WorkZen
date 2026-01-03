"use client";

import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { MOCK_PAYROLL, PayrollRecord } from "@/lib/mockData";
import { Download, DollarSign } from "lucide-react";

export default function PayrollPage() {
    const { user } = useAuth();

    if (!user) return null;

    const payrollData = user.role === "ADMIN"
        ? MOCK_PAYROLL
        : MOCK_PAYROLL.filter(p => p.userId === user.id);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight gradient-text">Payroll & Salary</h1>
                <p className="text-muted-foreground">View salary slips and payment history.</p>
            </div>

            <div className="grid gap-6">
                {payrollData.length > 0 ? (
                    payrollData.map((record) => (
                        <Card key={record.id} className="glass-card">
                            <CardHeader className="flex flex-row items-center justify-between bg-muted/20 pb-4">
                                <div>
                                    <CardTitle className="text-xl">Salary Slip - {record.month}</CardTitle>
                                    <CardDescription>Generated on 1st of next month</CardDescription>
                                </div>
                                <Button variant="outline" size="sm">
                                    <Download className="mr-2 h-4 w-4" /> Download PDF
                                </Button>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="grid md:grid-cols-4 gap-6 text-center md:text-left">
                                    <div className="space-y-1">
                                        <span className="text-sm text-muted-foreground">Basic Salary</span>
                                        <div className="text-2xl font-bold">${record.basicSalary}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-sm text-muted-foreground">Allowances</span>
                                        <div className="text-2xl font-bold text-green-600">+ ${record.allowances}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-sm text-muted-foreground">Deductions</span>
                                        <div className="text-2xl font-bold text-red-600">- ${record.deductions}</div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                                        <span className="text-sm font-medium text-primary uppercase tracking-wider">Net Salary</span>
                                        <div className="flex items-center justify-center md:justify-start gap-1 text-3xl font-bold text-primary">
                                            <DollarSign className="h-6 w-6" /> {record.netSalary}
                                        </div>
                                    </div>
                                </div>
                                {user.role === "ADMIN" && (
                                    <div className="mt-4 text-xs text-muted-foreground text-right border-t pt-2">
                                        Employee ID: {record.userId} | Status: <span className="text-green-600 font-bold">{record.status}</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-12 text-muted-foreground">No payroll records available.</div>
                )}
            </div>
        </div>
    );
}
