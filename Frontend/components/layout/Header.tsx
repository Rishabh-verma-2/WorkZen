"use client";

import { useAuth } from "@/context/AuthContext";
import { Avatar } from "@/components/ui/avatar"; // Will create this or use simple img
import { Bell } from "lucide-react";

export function Header() {
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-6 shadow-sm">
            <div className="flex-1">
                <h1 className="text-lg font-semibold md:ml-0 ml-10">
                    Welcome back, {user?.name.split(" ")[0]}!
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <button className="relative rounded-full p-2 h-10 w-10 flex items-center justify-center hover:bg-muted transition-colors">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
                </button>
                <div className="flex items-center gap-3 pl-4 border-l">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.role === 'ADMIN' ? 'HR Administrator' : user?.position}</p>
                    </div>
                    <img
                        src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`}
                        alt="Profile"
                        className="h-9 w-9 rounded-full border bg-muted object-cover"
                    />
                </div>
            </div>
        </header>
    );
}
