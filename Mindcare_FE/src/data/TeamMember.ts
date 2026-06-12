import { images } from "../assets/images";
import type { TeamMember, AdminTeamMember } from "./Types";

export const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: "Kimberly Bishop",
        role: "Professor & Relationship Coach",
        image: images.team.member1,
        Biography: [
            "Kimberly Bishop brings a unique blend of academic expertise and real-world experience to her relationship and family coaching practice. As an accomplished author and professor, she has dedicated her career to understanding and nurturing the intricate dynamics that shape our most important relationships.",
            "Drawing from her extensive background in the wedding industry, Kimberly has guided countless couples through the joys and challenges of building lifelong partnerships. Her approach combines evidence-based psychological principles with practical, actionable strategies that help clients create stronger, more fulfilling connections.",
            "With over 10 years of experience in relationship coaching, Kimberly specializes in helping individuals and couples navigate complex emotional landscapes, from premarital counseling to family conflict resolution."
        ],
        tags: ["Rising Coach", "Elite Coach", "Relationship Expert"],
        specialties: [
            { label: "Relationship Counseling",  benefit: "Personalized relationship strategies tailored to your unique situation" },
            { label: "Family Dynamics",          benefit: "Support in navigating family dynamics and conflict resolution" },
            { label: "Communication Skills",     benefit: "Evidence-based techniques for improving communication and emotional intelligence" },
            { label: "Conflict Resolution",      benefit: "Practical tools for de-escalating tension and reaching mutual understanding" },
            { label: "Premarital Coaching",      benefit: "Guidance for premarital counseling and building stronger partnerships" },
            { label: "Emotional Intelligence",   benefit: "Tools for developing healthier relationship patterns and habits" },
        ],
        qualifications: [
            "Ph.D. in Psychology from Stanford University",
            "Certified Relationship Coach (ICF accredited)",
            "Author of 'Building Lasting Bonds: A Guide to Healthy Relationships'",
            "Former Professor of Family Dynamics at UC Berkeley",
            "10+ years of clinical experience in couples therapy"
        ],
        location: "USA",
        review: "4.9 ★ (156 reviews)"
    },
    {
        id: 2,
        name: "Marcus Chen",
        role: "Career & Executive Coach",
        image: images.team.member2,
        Biography: [
            "Marcus Chen is a seasoned career and executive coach with a passion for helping professionals at every level unlock their true potential. His coaching philosophy centers on helping clients discover their strengths and align their careers with their deepest values.",
            "With a background in organizational psychology and 15 years of corporate leadership experience, Marcus brings a unique insider perspective to career coaching. He has helped hundreds of clients navigate career transitions, land dream roles, and accelerate their leadership growth."
        ],
        tags: ["Elite Coach", "Career Expert"],
        specialties: [
            { label: "Career Transitions",       benefit: "Strategic guidance for navigating career changes with clarity and confidence" },
            { label: "Executive Leadership",     benefit: "Leadership development coaching tailored to senior professionals" },
            { label: "Interview Preparation",    benefit: "Practical preparation techniques that help you communicate your value powerfully" },
            { label: "Strengths Assessment",     benefit: "Identify and leverage your unique strengths to stand out professionally" },
            { label: "Salary Negotiation",       benefit: "Evidence-based negotiation strategies to maximize your compensation" },
        ],
        qualifications: [
            "M.S. in Organizational Psychology, Columbia University",
            "Certified Professional Coach (ICF PCC)",
            "15 years of corporate leadership experience",
            "Certified StrengthsFinder Coach",
            "Former VP of Talent, Fortune 500 company"
        ],
        location: "USA",
        review: "4.8 ★ (203 reviews)"
    },
    {
        id: 3,
        name: "Dr. Priya Nair",
        role: "Health & Wellness Coach",
        image: images.team.member3,
        Biography: [
            "Dr. Priya Nair is a physician-turned-wellness coach who believes that true health is about far more than the absence of disease. Her integrative approach bridges modern medicine and holistic well-being to help clients build sustainable, energizing lifestyles.",
            "After a decade practicing internal medicine, Dr. Nair witnessed firsthand how lifestyle choices drive health outcomes. She retrained as a health coach to help clients make the behavioral changes that medicine alone cannot prescribe."
        ],
        tags: ["Rising Coach", "Health Expert"],
        specialties: [
            { label: "Nutrition Coaching",       benefit: "Science-backed nutritional guidance tailored to your body and goals" },
            { label: "Stress Management",        benefit: "Proven techniques to reduce chronic stress and restore mental balance" },
            { label: "Habit Formation",          benefit: "Step-by-step support for building healthy habits that actually last" },
            { label: "Sleep Optimization",       benefit: "Personalized strategies to improve sleep quality and daytime energy" },
            { label: "Mindful Movement",         benefit: "Exercise guidance that you will actually enjoy and sustain long-term" },
        ],
        qualifications: [
            "M.D. from Johns Hopkins School of Medicine",
            "Certified Integrative Health Coach (IIN)",
            "Board Certified in Internal Medicine",
            "Certified Mindfulness-Based Stress Reduction Instructor",
            "10 years clinical experience"
        ],
        location: "USA",
        review: "4.9 ★ (127 reviews)"
    },
    {
        id: 4,
        name: "Emma Richardson",
        role: "Life Coach & Mindset Mentor",
        image: images.team.member4,
        Biography: [
            "Emma Richardson is a life coach and mindset mentor who helps clients break free from self-limiting beliefs and design lives that truly excite them. Her warm, direct style creates a safe space for honest exploration and courageous action.",
            "Emma's own journey through burnout and reinvention fuels her empathy for clients navigating uncertainty. She brings both professional training and lived experience to every coaching conversation."
        ],
        tags: ["Rising Coach"],
        // remove label 
        specialties: [
            { label: "Mindset Coaching",         benefit: "Transform limiting beliefs into empowering perspectives that fuel growth" },
            { label: "Life Design",              benefit: "Co-create a compelling life vision aligned with your values and strengths" },
            { label: "Confidence Building",      benefit: "Develop unshakeable self-belief through consistent, targeted coaching" },
            { label: "Work-Life Balance",        benefit: "Practical strategies for sustainable balance across all areas of life" },
            { label: "Goal Achievement",         benefit: "Structured accountability systems to keep you on track and motivated" },
        ],
        qualifications: [
            "M.A. in Positive Psychology, University of Pennsylvania",
            "Certified Life Coach (ICF ACC)",
            "NLP Master Practitioner",
            "Certified in Cognitive Behavioral Coaching",
            "5+ years of private coaching practice"
        ],
        location: "UK",
        review: "4.7 ★ (89 reviews)"
    },
    {
        id: 5,
        name: "James Hartley",
        role: "Business & Leadership Coach",
        image: images.team.member5,
        Biography: [
            "James Hartley is a business and leadership coach who partners with entrepreneurs and executives to scale their businesses without sacrificing their well-being. His pragmatic, results-focused approach is grounded in 20 years of building and leading businesses.",
            "James has worked with founders of companies ranging from early-stage startups to publicly traded enterprises, helping them build the clarity, confidence, and capabilities needed to lead at the next level."
        ],
        tags: ["Elite Coach", "Business Expert"],
        specialties: [
            { label: "Business Strategy",        benefit: "Clarity on strategic priorities and a roadmap to achieve them" },
            { label: "Leadership Development",   benefit: "Build the leadership presence and skills that inspire high-performance teams" },
            { label: "Team Culture",             benefit: "Guidance on building a culture that attracts and retains top talent" },
            { label: "Scaling Operations",       benefit: "Frameworks for scaling your business while maintaining quality and culture" },
            { label: "Founder Coaching",         benefit: "Dedicated support for the unique psychological challenges founders face" },
        ],
        qualifications: [
            "MBA, London Business School",
            "Certified Executive Coach (ICF MCC)",
            "20 years of business leadership experience",
            "3x company founder",
            "Board advisor to 12+ companies"
        ],
        location: "UK",
        review: "4.9 ★ (174 reviews)"
    },
    {
        id: 6,
        name: "Dr. Sarah Mitchell",
        role: "Transformational Coach & Psychologist",
        image: images.team.member1,
        Biography: [
            "Dr. Sarah Mitchell is a licensed psychologist and certified transformational coach who helps high-achieving individuals break through the hidden patterns holding them back from their next level of success and fulfillment.",
            "Her integration of clinical psychology and professional coaching allows her to work at a depth rarely found in the coaching world — addressing not just behavior and goals, but the deeper beliefs, emotions, and identity that shape them."
        ],
        tags: ["Elite Coach"],
        specialties: [
            { label: "Transformational Change",  benefit: "Deep, lasting transformation rather than surface-level behavior change" },
            { label: "Inner Child Work",         benefit: "Heal formative patterns that unconsciously shape your present choices" },
            { label: "High Performance",         benefit: "Strategies for sustainable excellence without burnout or self-sacrifice" },
            { label: "Identity Coaching",        benefit: "Shift your self-concept so your identity aligns with your goals" },
            { label: "Resilience Building",      benefit: "Develop the emotional strength to thrive through any challenge" },
        ],
        qualifications: [
            "Ph.D. in Clinical Psychology, UCLA",
            "Licensed Psychologist (CA #PSY12345)",
            "Certified Transformational Coach (ICF PCC)",
            "Trained in EMDR and Internal Family Systems",
            "Author of 'Beyond the Breakthrough'"
        ],
        location: "USA",
        review: "5.0 ★ (211 reviews)"
    },
    {
        id: 7,
        name: "Victoria Walsh",
        role: "Executive & Corporate Coach",
        image: images.team.member2,
        Biography: [
            "Victoria Walsh coaches senior executives and leadership teams in global organizations. With a background spanning management consulting, neuroscience, and coaching, she brings a uniquely evidence-based lens to leadership development.",
            "Victoria has worked with clients in over 30 countries and is known for her ability to quickly build trust with senior leaders and create the conditions for honest, transformative conversations at the highest organizational levels."
        ],
        tags: ["Elite Coach"],
        specialties: [
            { label: "C-Suite Coaching",         benefit: "Confidential, strategic coaching for senior executives and board members" },
            { label: "Organizational Systems",   benefit: "Coaching that considers the leader within their full organizational context" },
            { label: "Stakeholder Influence",    benefit: "Build the credibility and influence to align stakeholders and drive change" },
            { label: "Decision Making",          benefit: "Frameworks for making high-stakes decisions with clarity and conviction" },
            { label: "Executive Presence",       benefit: "Command rooms and conversations with gravitas, warmth, and authenticity" },
        ],
        qualifications: [
            "M.Sc. in Cognitive Neuroscience, UCL",
            "MBA, INSEAD",
            "Certified Executive Coach (ICF MCC)",
            "Former Partner, McKinsey & Company",
            "Board Member, International Coaching Federation"
        ],
        location: "UK",
        review: "4.9 ★ (193 reviews)"
    }
];

// Derived filter values — replace with API calls when backend is ready

export const ALL_LOCATIONS: string[] = [
    "All Locations",
    ...Array.from(new Set(teamMembers.map((c) => c.location))),
];

export const ALL_TAGS: string[] = [
    "All",
    ...Array.from(new Set(teamMembers.flatMap((c) => c.tags))),
];

// ─── Admin team members ────────────────────────────────────────────────────────

export const ADMIN_TEAM: AdminTeamMember[] = [
    { id: 't1', name: 'Alice Nguyen', role: 'Admin',     email: 'alice@example.com', phone: '0901234567', joinDate: '01 Jan, 2023', status: 'Active',   avatar: '' },
    { id: 't2', name: 'Bob Tran',     role: 'Editor',    email: 'bob@example.com',   phone: '0912345678', joinDate: '15 Feb, 2023', status: 'Active',   avatar: '' },
    { id: 't3', name: 'Carol Le',     role: 'Author',    email: 'carol@example.com', phone: '0923456789', joinDate: '01 Mar, 2023', status: 'Inactive', avatar: '' },
    { id: 't4', name: 'David Pham',   role: 'Support',   email: 'david@example.com', phone: '0934567890', joinDate: '10 Apr, 2023', status: 'Active',   avatar: '' },
    { id: 't5', name: 'Eve Hoang',    role: 'Marketing', email: 'eve@example.com',   phone: '0945678901', joinDate: '20 May, 2023', status: 'Active',   avatar: '' },
    { id: 't6', name: 'Frank Vu',     role: 'Developer', email: 'frank@example.com', phone: '0956789012', joinDate: '05 Jun, 2023', status: 'Active',   avatar: '' },
];
