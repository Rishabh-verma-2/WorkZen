"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Users, ShieldCheck } from "lucide-react";

export default function Home() {
  const roles = [
    {
      title: "Employee",
      description: "Access your dashboard, leaves, and payroll",
      icon: User,
      href: "/login?role=EMPLOYEE",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "HR Manager",
      description: "Manage employees, recruitment, and attendance",
      icon: Users,
      href: "/login?role=ADMIN",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Admin",
      description: "System configuration and global settings",
      icon: ShieldCheck,
      href: "/login?role=ADMIN",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to WorkZen
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select your role to continue to the portal using your credentials
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {roles.map((role) => (
          <Link href={role.href} key={role.title} className="group transition-all hover:-translate-y-1">
            <Card className="h-full border-2 border-transparent hover:border-primary/10 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-2">
                <div className={`mx-auto w-16 h-16 rounded-2xl ${role.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <role.icon className={`w-8 h-8 ${role.color}`} />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">{role.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base mb-6">
                  {role.description}
                </CardDescription>
                <Button className="w-full" variant="outline">
                  Continue as {role.title}
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-sm text-muted-foreground">
        © {new Date().getFullYear()} WorkZen. All rights reserved.
      </div>
    </div>
  );
}
