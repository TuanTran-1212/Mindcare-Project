// Component: FaqSection
// Renders a list of accordion-style FAQ items.
// Uses the CSS .faq-item.active pattern so the max-height transition in contact.css works.
// One item open at a time — clicking the same item again closes it.

import { useState } from "react";

interface FaqItem {
    question: string;
    answer: string;
}

// Static FAQ content — move to a data file or API if it grows
const FAQ_ITEMS: FaqItem[] = [
    {
        question: "How do I sign up for a coaching service?",
        answer: "You can register online through our website or contact us directly by phone or email. Our team will guide you through the onboarding process.",
    },
    {
        question: "How much does a coaching session cost?",
        answer: "The cost depends on the type of service and coaching package you choose. Please get in touch to receive a detailed quote tailored to your needs.",
    },
    {
        question: "How are coaching sessions conducted?",
        answer: "Sessions can be held in person, online via video call, or a combination of both — whichever works best for you.",
    },
    {
        question: "How long does each session last?",
        answer: "Standard sessions are 60 minutes. Extended 90-minute sessions are available for deeper work and can be arranged in advance.",
    },
    {
        question: "Can I switch coaches after starting?",
        answer: "Absolutely. We want you to feel comfortable and supported. If you feel a different coach would be a better fit, just let us know and we will arrange a transfer at no extra cost.",
    },
    {
        question: "Is everything discussed in sessions kept confidential?",
        answer: "Yes. All sessions are strictly confidential. We follow professional coaching ethics and privacy standards. Information is only shared with your explicit consent.",
    },
];

const FaqSection = () => {
    // Track which FAQ index is open — -1 means all closed
    const [openIndex, setOpenIndex] = useState<number>(-1);

    // Toggle: clicking the open item closes it; clicking a different item opens it
    const handleToggle = (idx: number) =>
        setOpenIndex((prev) => (prev === idx ? -1 : idx));

    return (
        <section className="faq-section">
            <h2>FAQ</h2>
            <div className="faq-list">
                {FAQ_ITEMS.map((item, idx) => {
                    const isOpen = openIndex === idx;
                    return (
                        // Adding "active" class triggers the CSS max-height transition
                        <div key={idx} className={`faq-item${isOpen ? " active" : ""}`}>
                            <h3
                                className="faq-question"
                                onClick={() => handleToggle(idx)}
                                style={{ cursor: "pointer", userSelect: "none" }}
                                aria-expanded={isOpen}
                            >
                                {item.question}
                                <i
                                    className="fas fa-chevron-down faq-icon"
                                    style={{
                                        transition: "transform 0.3s",
                                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                    }}
                                />
                            </h3>
                            {/* faq-answer is always in DOM — CSS max-height animates open/close */}
                            <div className="faq-answer">
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default FaqSection;
