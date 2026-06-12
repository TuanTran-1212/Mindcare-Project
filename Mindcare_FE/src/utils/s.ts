import { images } from '../assets/images'
import type { BookRow, CourseRow, CustomerRow, BookingRow, OrderRow } from '../types'

export const MOCK_BOOKS: BookRow[] = [
  { id: 'b1', name: 'The Psychology of Money', price: 19.99, orders: 1240, amount: 24788, cover: '' },
  { id: 'b2', name: 'Atomic Habits', price: 17.50, orders: 980, amount: 17150, cover: '' },
  { id: 'b3', name: 'Deep Work', price: 15.00, orders: 750, amount: 11250, cover: '' },
  { id: 'b4', name: 'Zero to One', price: 22.00, orders: 620, amount: 13640, cover: '' },
  { id: 'b5', name: 'The Lean Startup', price: 18.00, orders: 540, amount: 9720, cover: '' },
  { id: 'b6', name: 'Good to Great', price: 20.00, orders: 430, amount: 8600, cover: '' },
  { id: 'b7', name: 'Thinking Fast and Slow', price: 16.00, orders: 390, amount: 6240, cover: '' },
  { id: 'b8', name: 'The Hard Thing About Hard Things', price: 21.00, orders: 310, amount: 6510, cover: '' },
]

export const MOCK_COURSES: CourseRow[] = [
  { id: 'c1', name: 'React & TypeScript Masterclass', price: 49.99, orders: 2100, amount: 104979, thumbnail: '' },
  { id: 'c2', name: 'Node.js Advanced Patterns', price: 39.99, orders: 1540, amount: 61585, thumbnail: '' },
  { id: 'c3', name: 'System Design Bootcamp', price: 59.99, orders: 980, amount: 58790, thumbnail: '' },
  { id: 'c4', name: 'Python for Data Science', price: 44.99, orders: 870, amount: 39141, thumbnail: '' },
  { id: 'c5', name: 'AWS Cloud Practitioner', price: 34.99, orders: 760, amount: 26592, thumbnail: '' },
  { id: 'c6', name: 'UI/UX Design Fundamentals', price: 29.99, orders: 650, amount: 19494, thumbnail: '' },
]

export const MOCK_CUSTOMERS: CustomerRow[] = [
  { id: 'cu1', name: 'Frank Hook', orders: 24, totalSpent: 1248, avatar: '' },
  { id: 'cu2', name: 'Sarah Johnson', orders: 18, totalSpent: 960, avatar: '' },
  { id: 'cu3', name: 'Mike Chen', orders: 15, totalSpent: 820, avatar: '' },
  { id: 'cu4', name: 'Emily Davis', orders: 12, totalSpent: 650, avatar: '' },
  { id: 'cu5', name: 'James Wilson', orders: 10, totalSpent: 540, avatar: '' },
  { id: 'cu6', name: 'Anna Martinez', orders: 9, totalSpent: 480, avatar: '' },
  { id: 'cu7', name: 'Robert Brown', orders: 7, totalSpent: 380, avatar: '' },
]

export const MOCK_BOOKINGS: BookingRow[] = [
  { id: 'bk1', name: 'Strategy Session', booking: 'Course Coaching', user: 'Frank Hook', hourSent: '10:00 AM', status: 'Confirmed', statusClass: 'bg-success-subtle text-success' },
  { id: 'bk2', name: 'Q&A Webinar', booking: 'Live Session', user: 'Sarah Johnson', hourSent: '2:00 PM', status: 'Pending', statusClass: 'bg-warning-subtle text-warning' },
  { id: 'bk3', name: 'Book Review Club', booking: 'Group Session', user: 'Mike Chen', hourSent: '4:00 PM', status: 'Confirmed', statusClass: 'bg-success-subtle text-success' },
  { id: 'bk4', name: '1-on-1 Mentoring', booking: 'Private Session', user: 'Emily Davis', hourSent: '9:00 AM', status: 'Cancelled', statusClass: 'bg-danger-subtle text-danger' },
  { id: 'bk5', name: 'Workshop: Writing', booking: 'Workshop', user: 'James Wilson', hourSent: '11:00 AM', status: 'Pending', statusClass: 'bg-warning-subtle text-warning' },
]

export const MOCK_ORDERS: OrderRow[] = [
  { id: '#VZ2101', customer: 'Frank Hook', product: 'Atomic Habits', amount: '654', status: 'Delivered', statusClass: 'bg-success-subtle text-success', date: '20 Dec, 2024', avatar: '' },
  { id: '#VZ2102', customer: 'Sarah Johnson', product: 'React Masterclass', amount: '320', status: 'Pending', statusClass: 'bg-warning-subtle text-warning', date: '21 Dec, 2024', avatar: '' },
  { id: '#VZ2103', customer: 'Mike Chen', product: 'System Design', amount: '480', status: 'Processing', statusClass: 'bg-info-subtle text-info', date: '22 Dec, 2024', avatar: '' },
  { id: '#VZ2104', customer: 'Emily Davis', product: 'Deep Work', amount: '210', status: 'Cancelled', statusClass: 'bg-danger-subtle text-danger', date: '23 Dec, 2024', avatar: '' },
  { id: '#VZ2105', customer: 'James Wilson', product: 'Zero to One', amount: '390', status: 'Delivered', statusClass: 'bg-success-subtle text-success', date: '24 Dec, 2024', avatar: '' },
  { id: '#VZ2106', customer: 'Anna Martinez', product: 'AWS Course', amount: '175', status: 'Pending', statusClass: 'bg-warning-subtle text-warning', date: '25 Dec, 2024', avatar: '' },
  { id: '#VZ2107', customer: 'Robert Brown', product: 'Python Science', amount: '290', status: 'Delivered', statusClass: 'bg-success-subtle text-success', date: '26 Dec, 2024', avatar: '' },
  { id: '#VZ2108', customer: 'Lisa Taylor', product: 'Good to Great', amount: '145', status: 'Processing', statusClass: 'bg-info-subtle text-info', date: '27 Dec, 2024', avatar: '' },
]

// Full team data
export interface TeamMember {
  id: string
  name: string
  role: string
  email: string
  phone: string
  joinDate: string
  status: 'Active' | 'Inactive'
  avatar: string
}

export const MOCK_TEAM: TeamMember[] = [
  { id: 't1', name: 'Alice Nguyen', role: 'Admin', email: 'alice@example.com', phone: '0901234567', joinDate: '01 Jan, 2023', status: 'Active', avatar: images.team.member1 },
  { id: 't2', name: 'Bob Tran', role: 'Editor', email: 'bob@example.com', phone: '0912345678', joinDate: '15 Feb, 2023', status: 'Active', avatar: images.team.member4 },
  { id: 't3', name: 'Carol Le', role: 'Author', email: 'carol@example.com', phone: '0923456789', joinDate: '01 Mar, 2023', status: 'Inactive', avatar: images.team.member2 },
  { id: 't4', name: 'David Pham', role: 'Support', email: 'david@example.com', phone: '0934567890', joinDate: '10 Apr, 2023', status: 'Active', avatar: images.team.member3 },
  { id: 't5', name: 'Eve Hoang', role: 'Marketing', email: 'eve@example.com', phone: '0945678901', joinDate: '20 May, 2023', status: 'Active', avatar: images.team.member4 },
  { id: 't6', name: 'Frank Vu', role: 'Developer', email: 'frank@example.com', phone: '0956789012', joinDate: '05 Jun, 2023', status: 'Active', avatar: images.team.member5 },
]

// Blog data
export interface BlogPost {
  id: string
  title: string
  category: string
  author: string
  date: string
  status: 'Published' | 'Draft'
  views: number
}

export const MOCK_BLOGS: BlogPost[] = [
  { id: 'blog1', title: 'Top 10 Books for Entrepreneurs', category: 'Business', author: 'Alice Nguyen', date: '01 Jan, 2025', status: 'Published', views: 1250 },
  { id: 'blog2', title: 'How to Build a Reading Habit', category: 'Self-Development', author: 'Bob Tran', date: '10 Jan, 2025', status: 'Published', views: 980 },
  { id: 'blog3', title: 'Online Courses vs Books', category: 'Education', author: 'Carol Le', date: '15 Jan, 2025', status: 'Draft', views: 0 },
  { id: 'blog4', title: 'The Future of E-Learning', category: 'Technology', author: 'David Pham', date: '20 Jan, 2025', status: 'Published', views: 760 },
  { id: 'blog5', title: 'Best React Resources 2025', category: 'Development', author: 'Frank Vu', date: '25 Jan, 2025', status: 'Published', views: 1840 },
  { id: 'blog6', title: 'TypeScript Deep Dive', category: 'Development', author: 'Frank Vu', date: '28 Jan, 2025', status: 'Draft', views: 0 },
]

export const MOCK_BLOG_CATEGORIES = [
  { id: 'bc1', name: 'Business', slug: 'business', postCount: 12, status: 'Active' },
  { id: 'bc2', name: 'Self-Development', slug: 'self-development', postCount: 8, status: 'Active' },
  { id: 'bc3', name: 'Education', slug: 'education', postCount: 15, status: 'Active' },
  { id: 'bc4', name: 'Technology', slug: 'technology', postCount: 20, status: 'Active' },
  { id: 'bc5', name: 'Development', slug: 'development', postCount: 18, status: 'Active' },
  { id: 'bc6', name: 'Lifestyle', slug: 'lifestyle', postCount: 5, status: 'Inactive' },
]

// Reviews
export interface Review {
  id: string
  reviewer: string
  product: string
  rating: number
  comment: string
  date: string
  status: 'Approved' | 'Pending' | 'Rejected'
}

export const MOCK_REVIEWS: Review[] = [
  { id: 'r1', reviewer: 'Frank Hook', product: 'Atomic Habits', rating: 5, comment: 'Excellent book! Changed my life.', date: '05 Jan, 2025', status: 'Approved' },
  { id: 'r2', reviewer: 'Sarah Johnson', product: 'React Masterclass', rating: 4, comment: 'Very comprehensive course.', date: '08 Jan, 2025', status: 'Approved' },
  { id: 'r3', reviewer: 'Mike Chen', product: 'System Design', rating: 5, comment: 'Best resource on the topic.', date: '10 Jan, 2025', status: 'Pending' },
  { id: 'r4', reviewer: 'Emily Davis', product: 'Deep Work', rating: 3, comment: 'Good but could be shorter.', date: '12 Jan, 2025', status: 'Approved' },
  { id: 'r5', reviewer: 'James Wilson', product: 'Zero to One', rating: 5, comment: 'Must read for entrepreneurs.', date: '15 Jan, 2025', status: 'Pending' },
  { id: 'r6', reviewer: 'Anna Martinez', product: 'AWS Course', rating: 2, comment: 'Too basic for me.', date: '18 Jan, 2025', status: 'Rejected' },
]

// Books categories
export const MOCK_BOOK_CATEGORIES = [
  { id: 'bcat1', name: 'Business & Economics', slug: 'business', bookCount: 45, status: 'Active' },
  { id: 'bcat2', name: 'Self-Help', slug: 'self-help', bookCount: 32, status: 'Active' },
  { id: 'bcat3', name: 'Technology', slug: 'technology', bookCount: 28, status: 'Active' },
  { id: 'bcat4', name: 'Science & Nature', slug: 'science', bookCount: 20, status: 'Inactive' },
  { id: 'bcat5', name: 'History & Biography', slug: 'history', bookCount: 15, status: 'Active' },
]

export const MOCK_COURSE_CATEGORIES = [
  { id: 'ccat1', name: 'Web Development', slug: 'web-dev', courseCount: 24, status: 'Active' },
  { id: 'ccat2', name: 'Data Science', slug: 'data-science', courseCount: 18, status: 'Active' },
  { id: 'ccat3', name: 'Cloud & DevOps', slug: 'cloud', courseCount: 12, status: 'Active' },
  { id: 'ccat4', name: 'UI/UX Design', slug: 'design', courseCount: 9, status: 'Active' },
  { id: 'ccat5', name: 'Mobile Development', slug: 'mobile', courseCount: 7, status: 'Inactive' },
]

// Full customer list
export interface FullCustomer {
  id: string
  name: string
  email: string
  phone: string
  totalOrders: number
  totalSpent: number
  joinDate: string
  status: 'Active' | 'Inactive'
  avatar: string
}

export const MOCK_FULL_CUSTOMERS: FullCustomer[] = [
  { id: 'fc1', name: 'Frank Hook', email: 'frank@example.com', phone: '0901111111', totalOrders: 24, totalSpent: 1248, joinDate: '01 Jan, 2023', status: 'Active', avatar: images.team.member1 },
  { id: 'fc2', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '0902222222', totalOrders: 18, totalSpent: 960, joinDate: '15 Feb, 2023', status: 'Active', avatar: images.team.member2 },
  { id: 'fc3', name: 'Mike Chen', email: 'mike@example.com', phone: '0903333333', totalOrders: 15, totalSpent: 820, joinDate: '01 Mar, 2023', status: 'Active', avatar: images.team.member3 },
  { id: 'fc4', name: 'Emily Davis', email: 'emily@example.com', phone: '0904444444', totalOrders: 12, totalSpent: 650, joinDate: '10 Apr, 2023', status: 'Inactive', avatar: images.team.member4 },
  { id: 'fc5', name: 'James Wilson', email: 'james@example.com', phone: '0905555555', totalOrders: 10, totalSpent: 540, joinDate: '20 May, 2023', status: 'Active', avatar: images.team.member5 },
  { id: 'fc6', name: 'Anna Martinez', email: 'anna@example.com', phone: '0906666666', totalOrders: 9, totalSpent: 480, joinDate: '05 Jun, 2023', status: 'Active', avatar: images.team.member1 },
  { id: 'fc7', name: 'Robert Brown', email: 'robert@example.com', phone: '0907777777', totalOrders: 7, totalSpent: 380, joinDate: '15 Jul, 2023', status: 'Inactive', avatar: images.team.member2 },
  { id: 'fc8', name: 'Lisa Taylor', email: 'lisa@example.com', phone: '0908888888', totalOrders: 5, totalSpent: 260, joinDate: '25 Aug, 2023', status: 'Active', avatar: images.team.member3 },
]
