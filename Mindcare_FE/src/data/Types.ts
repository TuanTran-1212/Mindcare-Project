export interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
    Biography: string[];
    tags: string[];
    // specialty and benefit are paired — each specialty maps to one benefit in the sidebar
    specialties?: CoachSpecialty[];
    qualifications?: string[];
    location: string;
    review?: string;
}

// Keeps specialty label + its matching benefit together as one data unit
export interface CoachSpecialty {
    label: string;    // e.g. "Relationship Counseling"
    benefit: string;  // e.g. "Personalized strategies tailored to your unique situation"
}

export interface Course {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    image: string;
    duration: string;
    rating: number;
    instructor?: string;
    lessonCount?: number;
    level?: string;
    language?: string;
    contentBlock?: ContentBlock[];
    category: string;
    isNew: boolean;
    isBestSeller: boolean;
}

export interface Book {
    id: number;
    name: string;
    description: string;
    pages: number;
    price: number;
    originalPrice: number;
    image: string;
    rating: number;
    author: string;
    publisher?: string;
    publishYear?: number;
    language?: string;
    contentBlock?: ContentBlock[];
    category: string;
    isNew: boolean;
    isBestSeller: boolean;
    stock: number;
    status: string;
}

export interface Testimonial {
    id: number;
    avatar: string;
    name: string;
    content: string;
}

// Shared rich-text content block — used in Blog, Book, and Course descriptions
type ContentBlock =
    | { type: "paragraph"; text: string }
    | { type: "image"; src: string; alt?: string }
    | { type: "heading"; text: string }
    | { type: "quote"; text: string; src: string };

export type { ContentBlock };

export interface BlogPost {
    id: number;
    thumbnail: string;
    title: string;
    date: string;
    author?: string;       // remove ? later
    description?: string;  // remove ? later
    contentBlock?: ContentBlock[];
}

// CourseChapterData.ts

export interface ChapterTopic {
    id: number;
    name: string;
}

export interface CourseChapter {
    id: number;
    courseId: number;      // Liên kết với id của Course
    title: string;         // VD: "Chapter 1: Introduction..."
    subtitle: string;      // VD: "Foundation Building • Beginner Friendly"
    summary: string;       // Mô tả ngắn gọn về chương

    // Các trường mới bổ sung
    videoUrl: string;      // Link nhúng (Youtube/Vimeo/Server)
    videoDuration: string; // Thời lượng hiển thị trên badge (VD: "20 min")
    totalMinutes: number;  // Tổng thời lượng tính bằng số để xử lý logic
    resourceCount: number; // Số lượng tài liệu đính kèm
    topics: ChapterTopic[];// Danh sách các mục tiêu/bài học nhỏ trong chương

    // Bổ sung các trạng thái hiển thị (tùy chọn)
    isOpen?: boolean;      // Để kiểm soát việc đóng mở mặc định
}

export interface PaginationState {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
}

// Can be extended later for other paginated sections
export interface PaginationConfig {
    team: PaginationState;
    courses: PaginationState;
    books: PaginationState;
    blog: PaginationState;
    testimonials: PaginationState;
    shopBooks?: PaginationState;
    shopCourses?: PaginationState;
    coaches?: PaginationState;
}

// ─── Admin / Dashboard types ───────────────────────────────────────────────────

/** Lightweight book row used in admin tables and dashboard widgets */
export interface BookRow {
    id: string;
    name: string;
    price: number;
    orders: number;
    amount: number;
    cover: string;
}

/** Lightweight course row used in admin tables and dashboard widgets */
export interface CourseRow {
    id: string;
    name: string;
    price: number;
    orders: number;
    amount: number;
    thumbnail: string;
}

/** Customer summary row used in dashboard widgets */
export interface CustomerRow {
    id: string;
    name: string;
    orders: number;
    totalSpent: number;
    avatar: string;
}

/** Booking row — reserved for future booking feature */
export interface BookingRow {
    id: string
  name: string
  booking: string
  user: string
  hourSent: string
  status: string
  statusClass: string
    // extend as needed
}

/** Order row used in admin order tables */
export interface OrderRow {
    id: string;
    customer: string;
    product: string;
    amount: string;
    status: string;
    statusClass: string;
    date: string;
    avatar: string;
}

/** Admin team member — different from the public-facing TeamMember (coach) */
export interface AdminTeamMember {
    id: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    joinDate: string;
    status: 'Active' | 'Inactive';
    avatar: string;
}

/** Admin blog post — simplified version for dashboard management */
export interface AdminBlogPost {
    id: string;
    title: string;
    category: string;
    author: string;
    date: string;
    status: 'Published' | 'Draft';
    views: number;
}

/** Blog category used in admin category management */
export interface BlogCategory {
    id: string;
    name: string;
    slug: string;
    postCount: number;
    status: 'Active' | 'Inactive';
}

/** Book category used in admin category management */
export interface BookCategory {
    id: string;
    name: string;
    slug: string;
    bookCount: number;
    status: 'Active' | 'Inactive';
}

/** Course category used in admin category management */
export interface CourseCategory {
    id: string;
    name: string;
    slug: string;
    courseCount: number;
    status: 'Active' | 'Inactive';
}

/** Product / course review submitted by a customer */
export interface Review {
    id: string;
    reviewer: string;
    product: string;
    rating: number;
    comment: string;
    date: string;
    status: 'Approved' | 'Pending' | 'Rejected';
}

/** Full customer profile used in the admin customer list */
export interface FullCustomer {
    id: string;
    name: string;
    email: string;
    phone: string;
    totalOrders: number;
    totalSpent: number;
    joinDate: string;
    status: 'Active' | 'Inactive';
    avatar: string;
}
