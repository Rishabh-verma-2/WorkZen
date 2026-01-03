export type UserRole = "ADMIN" | "EMPLOYEE";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    phone?: string;
    address?: string;
    position?: string;
    department?: string;
    joinDate?: string;
}

export type AttendanceStatus = "PRESENT" | "ABSENT" | "HALF_DAY" | "LEAVE";

export interface AttendanceRecord {
    id: string;
    userId: string;
    date: string; // YYYY-MM-DD
    checkIn?: string; // HH:mm
    checkOut?: string; // HH:mm
    status: AttendanceStatus;
}

export type LeaveType = "PAID" | "SICK" | "UNPAID";
export type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface LeaveRequest {
    id: string;
    userId: string;
    type: LeaveType;
    startDate: string;
    endDate: string;
    reason: string;
    status: LeaveStatus;
    createdAt: string;
}

export interface PayrollRecord {
    id: string;
    userId: string;
    month: string; // YYYY-MM
    basicSalary: number;
    allowances: number;
    deductions: number;
    netSalary: number;
    status: "PAID" | "PENDING";
    breakdown?: {
        earnings: {
            basic: number;
            hra: number;
            special: number;
            bonus?: number;
        };
        deductions: {
            pf: number;
            tax: number;
            other?: number;
        };
    };
}

// --- MOCK DATA ---

export const MOCK_USERS: User[] = [
    {
        id: "usr_1",
        name: "Admin User",
        email: "admin@workzen.com",
        role: "ADMIN",
        position: "HR Manager",
        department: "Human Resources",
        joinDate: "2023-01-15",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    },
    {
        id: "usr_2",
        name: "John Doe",
        email: "john@workzen.com",
        role: "EMPLOYEE",
        position: "Software Engineer",
        department: "Engineering",
        joinDate: "2023-03-10",
        phone: "+1 234 567 890",
        address: "123 Tech Park, Silicon Valley",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    {
        id: "usr_3",
        name: "Jane Smith",
        email: "jane@workzen.com",
        role: "EMPLOYEE",
        position: "Product Designer",
        department: "Design",
        joinDate: "2023-04-01",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
    // John's records
    {
        id: "att_1",
        userId: "usr_2",
        date: "2023-10-01",
        checkIn: "09:00",
        checkOut: "17:00",
        status: "PRESENT",
    },
    {
        id: "att_2",
        userId: "usr_2",
        date: "2023-10-02",
        checkIn: "09:15",
        checkOut: "17:10",
        status: "PRESENT",
    },
    {
        id: "att_3",
        userId: "usr_2",
        date: "2023-10-03",
        status: "ABSENT",
    },
    // Jane's records
    {
        id: "att_4",
        userId: "usr_3",
        date: "2023-10-01",
        checkIn: "08:55",
        checkOut: "16:55",
        status: "PRESENT",
    },
];

export const MOCK_LEAVES: LeaveRequest[] = [
    {
        id: "lv_1",
        userId: "usr_2",
        type: "SICK",
        startDate: "2023-10-05",
        endDate: "2023-10-06",
        reason: "Flu and fever",
        status: "APPROVED",
        createdAt: "2023-10-04",
    },
    {
        id: "lv_2",
        userId: "usr_3",
        type: "PAID",
        startDate: "2023-11-20",
        endDate: "2023-11-25",
        reason: "Family vacation",
        status: "PENDING",
        createdAt: "2023-11-10",
    },
];

export const MOCK_PAYROLL: PayrollRecord[] = [
    {
        id: "pay_1",
        userId: "usr_2",
        month: "2023-09",
        basicSalary: 3000,
        allowances: 3200,
        deductions: 200,
        netSalary: 6000,
        status: "PAID",
        breakdown: {
            earnings: {
                basic: 3000,
                hra: 1500,
                special: 1700,
            },
            deductions: {
                pf: 150,
                tax: 50,
            }
        }
    },
    {
        id: "pay_2",
        userId: "usr_3",
        month: "2023-09",
        basicSalary: 2500,
        allowances: 3000,
        deductions: 150,
        netSalary: 5350,
        status: "PAID",
        breakdown: {
            earnings: {
                basic: 2500,
                hra: 1250,
                special: 1750,
            },
            deductions: {
                pf: 100,
                tax: 50,
            }
        }
    },
    {
        id: "pay_3",
        userId: "usr_2",
        month: "2023-10",
        basicSalary: 3000,
        allowances: 3200,
        deductions: 200,
        netSalary: 6000,
        status: "PAID",
        breakdown: {
            earnings: {
                basic: 3000,
                hra: 1500,
                special: 1700,
            },
            deductions: {
                pf: 150,
                tax: 50,
            }
        }
    },
    {
        id: "pay_4",
        userId: "usr_2",
        month: "2023-11",
        basicSalary: 3000,
        allowances: 3200,
        deductions: 200,
        netSalary: 6000,
        status: "PAID",
        breakdown: {
            earnings: {
                basic: 3000,
                hra: 1500,
                special: 1700,
            },
            deductions: {
                pf: 150,
                tax: 50,
            }
        }
    },
    {
        id: "pay_5",
        userId: "usr_2",
        month: "2023-12",
        basicSalary: 3000,
        allowances: 4200,
        deductions: 200,
        netSalary: 7000,
        status: "PAID",
        breakdown: {
            earnings: {
                basic: 3000,
                hra: 1500,
                special: 1700,
                bonus: 1000
            },
            deductions: {
                pf: 150,
                tax: 50,
            }
        }
    },
];
