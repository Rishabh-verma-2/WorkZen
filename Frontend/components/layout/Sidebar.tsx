"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    UserCircle,
    CalendarCheck,
    FileText,
    DollarSign,
    LogOut,
    Menu
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Logo } from "@/components/ui/logo";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Profile", href: "/profile", icon: UserCircle },
    { name: "Attendance", href: "/attendance", icon: CalendarCheck },
    { name: "Leaves", href: "/leaves", icon: FileText },
    { name: "Payroll", href: "/payroll", icon: DollarSign },
];

export function Sidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-background rounded-md shadow border"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transition-transform duration-300 md:translate-x-0 glass",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center border-b px-6 justify-center">
                    <Logo />
                </div>

                <nav className="flex-1 space-y-1 p-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                                pathname === item.href
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "text-muted-foreground"
                            )}
                            onClick={() => setIsOpen(false)}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="border-t p-4">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                        onClick={() => logout()}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            </aside>
        </>
    );
}
