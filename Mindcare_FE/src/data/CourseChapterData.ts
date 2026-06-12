import type { CourseChapter } from "./Types";

// Course chapters — linked to courses by courseId
// Each chapter maps to one Course in CourseData.ts
export const courseChapters: CourseChapter[] = [
    // Transformational Coach (courseId: 1)
    { 
        id: 1, 
        courseId: 1, 
        title: "Introduction to Transformational Coaching", 
        subtitle: "Foundations • Philosophy",
        summary: "Understand the foundations and philosophy of transformational coaching and how it differs from other coaching styles.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        videoDuration: "15 min",
        totalMinutes: 45,
        resourceCount: 2,
        topics: [
            { id: 1, name: "Coaching vs Therapy" },
            { id: 2, name: "The Transformation Model" },
            { id: 3, name: "Ethics in Change" }
        ]
    },
    { 
        id: 2, 
        courseId: 1, 
        title: "The Coach Mindset", 
        subtitle: "Self-Awareness • Beliefs",
        summary: "Develop the mindset, beliefs, and self-awareness required to guide clients through meaningful breakthroughs.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        videoDuration: "12 min",
        totalMinutes: 30,
        resourceCount: 1,
        topics: [
            { id: 1, name: "The Growth Mindset" },
            { id: 2, name: "Overcoming Ego" }
        ]
    },
    { 
        id: 3, 
        courseId: 1, 
        title: "Building Powerful Questions", 
        subtitle: "Inquiry • Insights",
        summary: "Learn how to craft incisive questions that unlock insights and shift perspectives in your clients.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        videoDuration: "20 min",
        totalMinutes: 50,
        resourceCount: 4,
        topics: [
            { id: 1, name: "Open-ended Questions" },
            { id: 2, name: "The Art of Why" },
            { id: 3, name: "Silence as a Tool" }
        ]
    },
    { 
        id: 4, 
        courseId: 1, 
        title: "Active Listening & Presence", 
        subtitle: "Deep Listening • Safety",
        summary: "Master the art of deep listening and being fully present to create a safe space for transformation.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        videoDuration: "18 min",
        totalMinutes: 40,
        resourceCount: 2,
        topics: [
            { id: 1, name: "Level 3 Listening" },
            { id: 2, name: "Non-verbal Cues" }
        ]
    },

    // Life Coach (courseId: 2) 
    { 
        id: 9, 
        courseId: 2, 
        title: "Foundations of Life Coaching", 
        subtitle: "Core Principles • Rapport",
        summary: "Explore the core principles of life coaching and how to establish rapport with diverse clients.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        videoDuration: "10 min",
        totalMinutes: 25,
        resourceCount: 3,
        topics: [
            { id: 1, name: "The Life Wheel" },
            { id: 2, name: "Rapport Building" }
        ]
    },
    { 
        id: 10, 
        courseId: 2, 
        title: "Values Clarification", 
        subtitle: "Core Values • Decisions",
        summary: "Guide clients through identifying their core values as the compass for life decisions.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        videoDuration: "22 min",
        totalMinutes: 60,
        resourceCount: 5,
        topics: [
            { id: 1, name: "Value Assessment" },
            { id: 2, name: "Decision Frameworks" }
        ]
    },
    { 
        id: 11, 
        courseId: 2, 
        title: "Designing Your Ideal Life", 
        subtitle: "Vision • Mapping",
        summary: "Help clients envision and map out their ideal life across career, relationships, and well-being.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        videoDuration: "25 min",
        totalMinutes: 70,
        resourceCount: 2,
        topics: [
            { id: 1, name: "Life Visioning" },
            { id: 2, name: "Actionable Steps" }
        ]
    },

    // Business Coach (courseId: 3)
    { 
        id: 17, 
        courseId: 3, 
        title: "Business Coaching Fundamentals", 
        subtitle: "Leadership • Strategy",
        summary: "Learn the unique skills required to coach entrepreneurs and business leaders effectively.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        videoDuration: "30 min",
        totalMinutes: 90,
        resourceCount: 6,
        topics: [
            { id: 1, name: "Business Systems" },
            { id: 2, name: "Leadership IQ" }
        ]
    },
    { 
        id: 18, 
        courseId: 3, 
        title: "Strategic Vision & Planning", 
        subtitle: "Business Vision • Actions",
        summary: "Help clients clarify their business vision and create actionable strategic plans.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        videoDuration: "20 min",
        totalMinutes: 45,
        resourceCount: 3,
        topics: [
            { id: 1, name: "SWOT Analysis" },
            { id: 2, name: "Milestone Planning" }
        ]
    }
];

// Returns only the chapters belonging to a specific course
export const getChaptersByCourseId = (courseId: number): CourseChapter[] =>
    courseChapters.filter((chapter) => chapter.courseId === courseId);
