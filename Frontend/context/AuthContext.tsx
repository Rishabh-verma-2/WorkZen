"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, MOCK_USERS } from "@/lib/mockData";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, role: "ADMIN" | "EMPLOYEE") => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check local storage on mount
        const storedUser = localStorage.getItem("hrms_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, role: "ADMIN" | "EMPLOYEE") => {
        setIsLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simple mock logic: Find user by email or just pick the first one with matching role if specific email not found
        let foundUser = MOCK_USERS.find((u) => u.email === email && u.role === role);

        // Fallback for demo purposes if specific email not typed perfectly
        if (!foundUser) {
            foundUser = MOCK_USERS.find((u) => u.role === role);
        }

        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem("hrms_user", JSON.stringify(foundUser));
            router.push("/dashboard");
        } else {
            alert("Invalid credentials (Mock: Use admin@workzen.com or employee@workzen.com)");
        }
        setIsLoading(false);
    };

    const logout = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setUser(null);
        localStorage.removeItem("hrms_user");
        router.push("/login");
        setIsLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
