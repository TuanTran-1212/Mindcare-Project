import { images } from "../assets/images";
import type { Course, CourseRow, CourseCategory } from "./Types";

export const courses: Course[] = [
    {
        id: 1,
        name: "Transformational Coach",
        instructor: "Dr. Sarah Mitchell",
        duration: "12 Month Access",
        lessonCount: 24,
        level: "Beginner to Advanced",
        language: "English",
        description: "This popular coaching course teaches you how to guide others through lasting, life-changing breakthroughs.",
        price: 250,
        originalPrice: 395,
        image: images.method.m1,
        rating: 5,
        isNew: false,
        isBestSeller: true,
        category: "Personal Growth",
        contentBlock: [
            {
                type: "paragraph",
                text: "The Transformational Coach course is designed for aspiring and practicing coaches who want to help clients achieve profound, lasting change. You will learn how to facilitate deep inner shifts — not just behavioral tweaks."
            },
            { type: "heading", text: "What You Will Learn" },
            { type: "quote", text: "Transformation is not an event. It is an ongoing process — and this course gives you the tools to guide it.", src: "Dr. Sarah Mitchell" }
        ]
    },
    {
        id: 2,
        name: "Life Coach",
        instructor: "Emma Richardson",
        duration: "12 Month Access",
        lessonCount: 20,
        level: "Beginner to Intermediate",
        language: "English",
        description: "This popular coaching course teaches you how to guide others through lasting, life-changing breakthroughs.",
        price: 295,
        originalPrice: 395,
        image: images.method.m3,
        rating: 5,
        isNew: false,
        isBestSeller: true,
        category: "Life Coaching",
        contentBlock: [
            {
                type: "paragraph",
                text: "The Life Coach course is a comprehensive training program that prepares you to support clients across every area of life — career, relationships, health, purpose, and personal growth."
            },
            { type: "heading", text: "A Holistic Approach" },
            { type: "quote", text: "Life coaching is not about fixing people. It is about revealing the wholeness that was always there.", src: "Emma Richardson" }
        ]
    },
    {
        id: 3,
        name: "Business Coach",
        instructor: "James Hartley",
        duration: "12 Month Access",
        lessonCount: 22,
        level: "Intermediate to Advanced",
        language: "English",
        description: "Learn to coach entrepreneurs and business leaders to achieve their goals and overcome challenges.",
        price: 280,
        originalPrice: 400,
        image: images.method.m2,
        rating: 5,
        isNew: true,
        isBestSeller: false,
        category: "Business",
        contentBlock: [
            {
                type: "paragraph",
                text: "The Business Coach course prepares you to work with founders, executives, and business owners who are building organizations and navigating complex leadership challenges."
            },
            { type: "heading", text: "Strategic and Leadership Focus" },
            { type: "quote", text: "The best business coaches are not consultants who give answers. They are partners who ask better questions.", src: "James Hartley" }
        ]
    },
    {
        id: 4,
        name: "Health Coach",
        instructor: "Dr. Priya Nair",
        duration: "12 Month Access",
        lessonCount: 18,
        level: "Beginner to Intermediate",
        language: "English",
        description: "Master the skills to help clients improve their health, wellness, and lifestyle habits.",
        price: 260,
        originalPrice: 380,
        image: images.hero.h2,
        rating: 5,
        isNew: false,
        isBestSeller: true,
        category: "Wellness",
        contentBlock: [
            {
                type: "paragraph",
                text: "The Health Coach course trains you to support clients in making meaningful, lasting improvements to their physical and mental well-being."
            },
            { type: "heading", text: "Behavior Change Science" },
            { type: "quote", text: "Health coaching meets the client where they are — not where we wish they were.", src: "Dr. Priya Nair" }
        ]
    },
    {
        id: 5,
        name: "Relationship Coach",
        instructor: "Kimberly Bishop",
        duration: "12 Month Access",
        lessonCount: 16,
        level: "Beginner to Intermediate",
        language: "English",
        description: "Develop expertise in coaching couples and individuals on relationship dynamics.",
        price: 290,
        originalPrice: 410,
        image: images.hero.h3,
        rating: 5,
        isNew: true,
        isBestSeller: false,
        category: "Relationship",
        contentBlock: [
            {
                type: "paragraph",
                text: "The Relationship Coach course gives you the skills to help clients build healthier, more fulfilling relationships."
            },
            { type: "heading", text: "Ethics and Boundaries" },
            { type: "quote", text: "Every relationship struggle is ultimately a communication challenge...", src: "Kimberly Bishop" }
        ]
    },
    {
        id: 6,
        name: "Career Coach",
        instructor: "Marcus Chen",
        duration: "12 Month Access",
        lessonCount: 15,
        level: "Beginner to Intermediate",
        language: "English",
        description: "Guide clients through career transitions, job searches, and professional development.",
        price: 240,
        originalPrice: 375,
        image: images.aboutus.picture,
        rating: 5,
        isNew: true,
        isBestSeller: false,
        category: "Career",
        contentBlock: [
            {
                type: "paragraph",
                text: "The Career Coach course prepares you to guide clients through every stage of their professional journey."
            },
            { type: "heading", text: "Modern Career Landscape" },
            { type: "quote", text: "A career coach does not find you a job. They help you discover who you are at your best...", src: "Marcus Chen" }
        ]
    },
    {
        id: 7,
        name: "Executive Coach",
        instructor: "Victoria Walsh",
        duration: "12 Month Access",
        lessonCount: 20,
        level: "Advanced",
        language: "English",
        description: "Specialize in coaching high-level executives and leaders in corporate environments.",
        price: 270,
        originalPrice: 390,
        image: images.hero.h3,
        rating: 5,
        isNew: false,
        isBestSeller: true,
        category: "Leadership",
        contentBlock: [
            {
                type: "paragraph",
                text: "The Executive Coach course is an advanced program for coaches who want to work at the highest levels of organizations."
            },
            { type: "heading", text: "Systemic and Organizational Lens" },
            { type: "quote", text: "The most effective executive coaches are trusted partners who challenge leaders to see their blind spots...", src: "Victoria Walsh" }
        ]
    }
];

// ─── Admin dashboard course rows ──────────────────────────────────────────────

export const ADMIN_COURSES: CourseRow[] = [
    { id: 'c1', name: 'React & TypeScript Masterclass', price: 49.99, orders: 2100, amount: 104979, thumbnail: images.method.m1 },
    { id: 'c2', name: 'Node.js Advanced Patterns',      price: 39.99, orders: 1540, amount: 61585,  thumbnail: images.method.m2 },
    { id: 'c3', name: 'System Design Bootcamp',         price: 59.99, orders: 980,  amount: 58790,  thumbnail: images.method.m3 },
    { id: 'c4', name: 'Python for Data Science',        price: 44.99, orders: 870,  amount: 39141,  thumbnail: images.method.m1 },
    { id: 'c5', name: 'AWS Cloud Practitioner',         price: 34.99, orders: 760,  amount: 26592,  thumbnail: images.method.m2 },
    { id: 'c6', name: 'UI/UX Design Fundamentals',      price: 29.99, orders: 650,  amount: 19494,  thumbnail: images.method.m3 },
];

// ─── Course categories ─────────────────────────────────────────────────────────

export const COURSE_CATEGORIES: CourseCategory[] = [
    { id: 'ccat1', name: 'Web Development',    slug: 'web-dev',      courseCount: 24, status: 'Active' },
    { id: 'ccat2', name: 'Data Science',       slug: 'data-science', courseCount: 18, status: 'Active' },
    { id: 'ccat3', name: 'Cloud & DevOps',     slug: 'cloud',        courseCount: 12, status: 'Active' },
    { id: 'ccat4', name: 'UI/UX Design',       slug: 'design',       courseCount: 9,  status: 'Active' },
    { id: 'ccat5', name: 'Mobile Development', slug: 'mobile',       courseCount: 7,  status: 'Inactive' },
];
