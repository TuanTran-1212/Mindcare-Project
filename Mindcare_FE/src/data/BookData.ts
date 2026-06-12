import { images } from "../assets/images";
import type { Book, BookRow, BookCategory } from "./Types";

export const books: Book[] = [
    {
        id: 1,
        name: "The Coaching Habit",
        author: "Michael Bungay Stanier",
        publisher: "Box of Crayons Press",
        publishYear: 2016,
        language: "English",
        description: "A practical guide to becoming a better coach with simple questions and habits.",
        price: 19.99,
        originalPrice: 29.99,
        image: images.hero.h1,
        pages: 208, 
        rating: 5,
        stock: 100, // Thêm mới
        status: "ACTIVE",    // Thêm mới
        isNew: false,
        isBestSeller: true,
        category: "Leadership",
        contentBlock: [
            {
                type: "paragraph",
                text: "The Coaching Habit is the most practical coaching book ever written..."
            },
            { type: "heading", text: "Why This Book Matters" },
            { type: "quote", text: "Be lazy, be curious, be often...", src: "Michael Bungay Stanier" }
        ]
    },
    {
        id: 2,
        name: "Coaching for Performance",
        author: "Sir John Whitmore",
        publisher: "Nicholas Brealey Publishing",
        publishYear: 2017,
        language: "English",
        description: "Unlock your potential and achieve peak performance with proven coaching techniques.",
        price: 24.99,
        originalPrice: 34.99,
        image: images.hero.h2,
        pages: 256,
        rating: 5,
        stock: 50,  // Thêm mới
        status: "ACTIVE",    // Thêm mới
        isNew: false,
        isBestSeller: true,
        category: "Business",
        contentBlock: [
            {
                type: "paragraph",
                text: "Coaching for Performance is the definitive guide to the coaching profession..."
            },
            { type: "heading", text: "The GROW Model" },
            { type: "quote", text: "Coaching is unlocking a person's potential...", src: "Sir John Whitmore" }
        ]
    },
    {
        id: 3,
        name: "The Life Coach",
        author: "Eileen Mulligan",
        publisher: "Time Warner Books",
        publishYear: 2019,
        language: "English",
        description: "Transform your life and help others do the same with this comprehensive coaching manual.",
        price: 17.99,
        originalPrice: 27.99,
        image: images.hero.h3,
        pages: 192,
        rating: 5,
        stock: 75,   // Thêm mới
        status: "ACTIVE",    // Thêm mới
        isNew: true,
        isBestSeller: false,
        category: "Life Coaching",
        contentBlock: [
            { type: "paragraph", text: "The Life Coach is a compassionate and actionable guide..." },
            { type: "quote", text: "Change is not something that happens to you...", src: "Eileen Mulligan" }
        ]
    },
    {
        id: 4,
        name: "Executive Presence",
        author: "Sylvia Ann Hewlett",
        publisher: "Harper Business",
        publishYear: 2014,
        language: "English",
        description: "Develop the leadership skills and presence needed to excel in executive roles.",
        price: 29.99,
        originalPrice: 39.99,
        image: images.aboutus.video,
        pages: 320,
        rating: 5,
        stock: 30,   // Thêm mới
        status: "ACTIVE",    // Thêm mới
        isNew: false,
        isBestSeller: true,
        category: "Leadership",
        contentBlock: [
            { type: "paragraph", text: "Executive Presence reveals exactly what it takes to project leadership gravitas..." },
            { type: "quote", text: "Presence is not about changing who you are...", src: "Sylvia Ann Hewlett" }
        ]
    },
    {
        id: 5,
        name: "Mindfulness for Coaches",
        author: "Liz Hall",
        publisher: "Kogan Page",
        publishYear: 2013,
        language: "English",
        description: "Incorporate mindfulness practices into your coaching to enhance client outcomes.",
        price: 15.99,
        originalPrice: 25.99,
        image: images.method.m1,
        pages: 176,
        rating: 5,
        stock: 120,  // Thêm mới
        status: "ACTIVE",    // Thêm mới
        isNew: true,
        isBestSeller: false,
        category: "Wellness",
        contentBlock: [
            { type: "paragraph", text: "Liz Hall shows coaches how to cultivate their own mindfulness..." },
            { type: "quote", text: "Mindfulness is not an add-on to coaching...", src: "Liz Hall" }
        ]
    },
    {
        id: 6,
        name: "The Art of Coaching",
        author: "Elena Aguilar",
        publisher: "Jossey-Bass",
        publishYear: 2013,
        language: "English",
        description: "Master the art and science of coaching with this essential guide for professionals.",
        price: 21.99,
        originalPrice: 31.99,
        image: images.method.m2,
        pages: 288,
        rating: 5,
        stock: 45,   // Thêm mới
        status: "ACTIVE",    // Thêm mới
        isNew: false,
        isBestSeller: true,
        category: "Education",
        contentBlock: [
            { type: "paragraph", text: "The Art of Coaching is Elena Aguilar's definitive guide..." },
            { type: "quote", text: "Coaching is about creating the conditions for transformation...", src: "Elena Aguilar" }
        ]
    },
    {
        id: 7,
        name: "Coaching Psychology Manual",
        author: "Margaret Moore & Bob Tschannen-Moran",
        publisher: "Lippincott Williams & Wilkins",
        publishYear: 2010,
        language: "English",
        description: "A comprehensive manual on the psychology behind effective coaching practices.",
        price: 26.99,
        originalPrice: 36.99,
        image: images.method.m3,
        pages: 352,
        rating: 5,
        stock: 0,    // Ví dụ trường hợp hết hàng
        status: "INACTIVE",  // Ví dụ trạng thái ẩn
        isNew: true,
        isBestSeller: false,
        category: "Psychology",
        contentBlock: [
            { type: "paragraph", text: "It synthesizes decades of psychological research..." },
            { type: "quote", text: "Sustainable behavior change is not about willpower...", src: "Margaret Moore" }
        ]
    }
];

// ─── Admin dashboard book rows ─────────────────────────────────────────────────

export const ADMIN_BOOKS: BookRow[] = [
    { id: 'b1', name: 'The Psychology of Money', price: 19.99, orders: 1240, amount: 24788, cover: images.books.book1 },
    { id: 'b2', name: 'Atomic Habits',            price: 17.50, orders: 980,  amount: 17150, cover: images.books.book2 },
    { id: 'b3', name: 'Deep Work',                price: 15.00, orders: 750,  amount: 11250, cover: images.books.book3 },
    { id: 'b4', name: 'Zero to One',              price: 22.00, orders: 620,  amount: 13640, cover: images.books.book1 },
    { id: 'b5', name: 'The Lean Startup',         price: 18.00, orders: 540,  amount: 9720,  cover: images.books.book2 },
    { id: 'b6', name: 'Good to Great',            price: 20.00, orders: 430,  amount: 8600,  cover: images.books.book3 },
    { id: 'b7', name: 'Thinking Fast and Slow',   price: 16.00, orders: 390,  amount: 6240,  cover: images.books.book2 },
    { id: 'b8', name: 'The Hard Thing About Hard Things', price: 21.00, orders: 310, amount: 6510, cover: images.books.book1 },
];

// ─── Book categories ───────────────────────────────────────────────────────────

export const BOOK_CATEGORIES: BookCategory[] = [
    { id: 'bcat1', name: 'Business & Economics', slug: 'business',  bookCount: 45, status: 'Active' },
    { id: 'bcat2', name: 'Self-Help',            slug: 'self-help', bookCount: 32, status: 'Active' },
    { id: 'bcat3', name: 'Technology',           slug: 'technology',bookCount: 28, status: 'Active' },
    { id: 'bcat4', name: 'Science & Nature',     slug: 'science',   bookCount: 20, status: 'Inactive' },
    { id: 'bcat5', name: 'History & Biography',  slug: 'history',   bookCount: 15, status: 'Active' },
];
