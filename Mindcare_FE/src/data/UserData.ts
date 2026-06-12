import { images } from "../assets/images";
import type { CustomerRow, BookingRow, OrderRow, Review, FullCustomer } from "./Types";

// ─── Auth / user profile ───────────────────────────────────────────────────────

export interface CouponData {
    code: string;
    discount: string;
    expiry: string;
}

export interface OrderData {
    id: string;
    course: string;
    date: string;
    price: string;
    paymentMethod: string;
    couponCode: string;
    quantity: number;
}

export interface UserProfile {
    id: number;
    username: string;
    password: string;
    fullName: string;
    email: string;
    phone: string;
    avatar: string;
    gender: string;
    address: string;
    dateOfBirth: string;
    idCard: string;
    points: number;
    coupons: CouponData[];
    orders: OrderData[];
    shippingAddress: string;
    additionalAddress: string;
    shippingPreference: string;
}

export const USERS: UserProfile[] = [
    {
        id: 1,
        username: "admin",
        password: "123456",
        fullName: "Tuan Tran",
        email: "tuantran@gmail.com",
        phone: "+84 915 659 223",
        avatar: images.team.member1,
        gender: "Male",
        address: "130 Xo Viet Nghe Tinh, Binh Thanh, HCMC",
        dateOfBirth: "01/11/1999",
        idCard: "362209685",
        points: 1250,
        shippingAddress: "130 Xo Viet Nghe Tinh, Binh Thanh, HCMC",
        additionalAddress: "",
        shippingPreference: "standard",
        coupons: [
            { code: "SAVE10", discount: "10% off", expiry: "12/31/2025" },
            { code: "WELCOME20", discount: "$20 off", expiry: "11/15/2025" },
        ],
        orders: [
            {
                id: "UD-20231001-1234567890",
                course: "Introduction to Coaching",
                date: "2023-10-01",
                price: "$0.00",
                paymentMethod: "Free Coupon",
                couponCode: "FREECOURSE2023",
                quantity: 1,
            },
            {
                id: "UD-20230915-0987654321",
                course: "Basic Life Skills",
                date: "2023-09-15",
                price: "$0.00",
                paymentMethod: "Free Coupon",
                couponCode: "FREECOURSE2023",
                quantity: 1,
            },
            {
                id: "UD-20230820-1122334455",
                course: "Mindfulness Fundamentals",
                date: "2023-08-20",
                price: "$0.00",
                paymentMethod: "Free Coupon",
                couponCode: "FREECOURSE2023",
                quantity: 1,
            },
        ],
    },
    {
        id: 2,
        username: "user",
        password: "password",
        fullName: "Nguyen Van A",
        email: "nguyenvana@example.com",
        phone: "+84 123 456 789",
        avatar: images.team.member2,
        gender: "Male",
        address: "123 ABC Street, XYZ District, HCMC",
        dateOfBirth: "05/05/1995",
        idCard: "123456789",
        points: 500,
        shippingAddress: "123 ABC Street, XYZ District, HCMC",
        additionalAddress: "",
        shippingPreference: "express",
        coupons: [{ code: "SAVE10", discount: "10% off", expiry: "12/31/2025" }],
        orders: [],
    },
];

/**
 * Validate login credentials against user data.
 * Returns the matching user or null.
 */
export function validateLogin(username: string, password: string): UserProfile | null {
    return USERS.find((u) => u.username === username && u.password === password) ?? null;
}

/**
 * Get user by id.
 */
export function getUserById(id: number): UserProfile | null {
    return USERS.find((u) => u.id === id) ?? null;
}

// ─── Admin dashboard — customer summary rows ──────────────────────────────────

export const ADMIN_CUSTOMERS: CustomerRow[] = [
    { id: 'cu1', name: 'Frank Hook', orders: 24, totalSpent: 1248, avatar: images.team.member2 },
    { id: 'cu2', name: 'Sarah Johnson', orders: 18, totalSpent: 960, avatar: images.team.member3 },
    { id: 'cu3', name: 'Mike Chen', orders: 15, totalSpent: 820, avatar: images.team.member4 },
    { id: 'cu4', name: 'Emily Davis', orders: 12, totalSpent: 650, avatar: images.team.member5 },
    { id: 'cu5', name: 'James Wilson', orders: 10, totalSpent: 540, avatar: images.team.member1 },
    { id: 'cu6', name: 'Anna Martinez', orders: 9, totalSpent: 480, avatar: images.team.member2 },
    { id: 'cu7', name: 'Robert Brown', orders: 7, totalSpent: 380, avatar: images.team.member3 },
];

// ─── Admin dashboard — full customer list ─────────────────────────────────────

export const ADMIN_FULL_CUSTOMERS: FullCustomer[] = [
    { id: 'fc1', name: 'Frank Hook', email: 'frank@example.com', phone: '0901111111', totalOrders: 24, totalSpent: 1248, joinDate: '01 Jan, 2023', status: 'Active', avatar: '' },
    { id: 'fc2', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '0902222222', totalOrders: 18, totalSpent: 960, joinDate: '15 Feb, 2023', status: 'Active', avatar: '' },
    { id: 'fc3', name: 'Mike Chen', email: 'mike@example.com', phone: '0903333333', totalOrders: 15, totalSpent: 820, joinDate: '01 Mar, 2023', status: 'Active', avatar: '' },
    { id: 'fc4', name: 'Emily Davis', email: 'emily@example.com', phone: '0904444444', totalOrders: 12, totalSpent: 650, joinDate: '10 Apr, 2023', status: 'Inactive', avatar: '' },
    { id: 'fc5', name: 'James Wilson', email: 'james@example.com', phone: '0905555555', totalOrders: 10, totalSpent: 540, joinDate: '20 May, 2023', status: 'Active', avatar: '' },
    { id: 'fc6', name: 'Anna Martinez', email: 'anna@example.com', phone: '0906666666', totalOrders: 9, totalSpent: 480, joinDate: '05 Jun, 2023', status: 'Active', avatar: '' },
    { id: 'fc7', name: 'Robert Brown', email: 'robert@example.com', phone: '0907777777', totalOrders: 7, totalSpent: 380, joinDate: '15 Jul, 2023', status: 'Inactive', avatar: '' },
    { id: 'fc8', name: 'Lisa Taylor', email: 'lisa@example.com', phone: '0908888888', totalOrders: 5, totalSpent: 260, joinDate: '25 Aug, 2023', status: 'Active', avatar: '' },
];

// ─── Admin dashboard — order rows ─────────────────────────────────────────────

export const ADMIN_ORDERS: OrderRow[] = [
    { id: '#VZ2101', customer: 'Frank Hook', product: 'Atomic Habits', amount: '654', status: 'Delivered', statusClass: 'bg-success-subtle text-success', date: '20 Dec, 2024', avatar: images.team.member2 },
    { id: '#VZ2102', customer: 'Sarah Johnson', product: 'React Masterclass', amount: '320', status: 'Pending', statusClass: 'bg-warning-subtle text-warning', date: '21 Dec, 2024', avatar: images.team.member2 },
    { id: '#VZ2103', customer: 'Mike Chen', product: 'System Design', amount: '480', status: 'Processing', statusClass: 'bg-info-subtle text-info', date: '22 Dec, 2024', avatar: images.team.member2 },
    { id: '#VZ2104', customer: 'Emily Davis', product: 'Deep Work', amount: '210', status: 'Cancelled', statusClass: 'bg-danger-subtle text-danger', date: '23 Dec, 2024', avatar: images.team.member2 },
    { id: '#VZ2105', customer: 'James Wilson', product: 'Zero to One', amount: '390', status: 'Delivered', statusClass: 'bg-success-subtle text-success', date: '24 Dec, 2024', avatar: images.team.member2 },
    { id: '#VZ2106', customer: 'Anna Martinez', product: 'AWS Course', amount: '175', status: 'Pending', statusClass: 'bg-warning-subtle text-warning', date: '25 Dec, 2024', avatar: images.team.member2 },
    { id: '#VZ2107', customer: 'Robert Brown', product: 'Python Science', amount: '290', status: 'Delivered', statusClass: 'bg-success-subtle text-success', date: '26 Dec, 2024', avatar: images.team.member2 },
    { id: '#VZ2108', customer: 'Lisa Taylor', product: 'Good to Great', amount: '145', status: 'Processing', statusClass: 'bg-info-subtle text-info', date: '27 Dec, 2024', avatar: images.team.member2 },
];

// ─── Admin dashboard — bookings (reserved for future feature) ─────────────────

export const ADMIN_BOOKINGS: BookingRow[] = [
    { id: 'bk1', name: 'Strategy Session', booking: 'Course Coaching', user: 'Frank Hook', hourSent: '10:00 AM', status: 'Confirmed', statusClass: 'bg-success-subtle text-success' },
];

// ─── Admin dashboard — product reviews ───────────────────────────────────────

export const ADMIN_REVIEWS: Review[] = [
    { id: 'r1', reviewer: 'Frank Hook', product: 'Atomic Habits', rating: 5, comment: 'Excellent book! Changed my life.', date: '05 Jan, 2025', status: 'Approved' },
    { id: 'r2', reviewer: 'Sarah Johnson', product: 'React Masterclass', rating: 4, comment: 'Very comprehensive course.', date: '08 Jan, 2025', status: 'Approved' },
    { id: 'r3', reviewer: 'Mike Chen', product: 'System Design', rating: 5, comment: 'Best resource on the topic.', date: '10 Jan, 2025', status: 'Pending' },
    { id: 'r4', reviewer: 'Emily Davis', product: 'Deep Work', rating: 3, comment: 'Good but could be shorter.', date: '12 Jan, 2025', status: 'Approved' },
    { id: 'r5', reviewer: 'James Wilson', product: 'Zero to One', rating: 5, comment: 'Must read for entrepreneurs.', date: '15 Jan, 2025', status: 'Pending' },
    { id: 'r6', reviewer: 'Anna Martinez', product: 'AWS Course', rating: 2, comment: 'Too basic for me.', date: '18 Jan, 2025', status: 'Rejected' },
];
