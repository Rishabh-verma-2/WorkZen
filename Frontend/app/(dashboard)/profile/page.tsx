"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { MapPin, Phone, Mail, Calendar, Briefcase, User as UserIcon } from "lucide-react";

export default function ProfilePage() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [phone, setPhone] = useState(user?.phone || "");
    const [address, setAddress] = useState(user?.address || "");

    if (!user) return null;

    const handleSave = () => {
        // In a real app, update backend
        setIsEditing(false);
        alert("Profile updated successfully!");
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Banner */}
            <div className="relative h-48 rounded-xl bg-gradient-to-r from-primary to-accent overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Profile Header */}
            <div className="relative px-6 -mt-12 flex flex-col md:flex-row items-end md:items-end gap-6">
                <div className="relative">
                    <img
                        src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
                        alt={user.name}
                        className="h-32 w-32 rounded-full border-4 border-background bg-background object-cover shadow-lg"
                    />
                </div>
                <div className="flex-1 mb-2">
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                    <p className="text-muted-foreground flex items-center gap-2">
                        <Briefcase className="h-4 w-4" /> {user.position} • {user.department}
                    </p>
                </div>
                <div className="mb-2">
                    <Button onClick={() => isEditing ? handleSave() : setIsEditing(!isEditing)}>
                        {isEditing ? "Save Changes" : "Edit Profile"}
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Your contact details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Full Name</Label>
                            <Input value={user.name} disabled className="bg-muted/50" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input value={user.email} disabled className="pl-9 bg-muted/50" />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Phone Number</Label>
                            <div className="relative">
                                <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    disabled={!isEditing}
                                    className={!isEditing ? "pl-9 bg-muted/50" : "pl-9"}
                                    placeholder="+1 234 567 890"
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Address</Label>
                            <div className="relative">
                                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    disabled={!isEditing}
                                    className={!isEditing ? "pl-9 bg-muted/50" : "pl-9"}
                                    placeholder="123 St, City, Country"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Employment Details</CardTitle>
                        <CardDescription>Role and department information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Employee ID</Label>
                            <Input value={user.id} disabled className="bg-muted/50 font-mono" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Department</Label>
                            <Input value={user.department} disabled className="bg-muted/50" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Designation</Label>
                            <Input value={user.position} disabled className="bg-muted/50" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Date of Joining</Label>
                            <div className="relative">
                                <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input value={user.joinDate || "2023-01-01"} disabled className="pl-9 bg-muted/50" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
