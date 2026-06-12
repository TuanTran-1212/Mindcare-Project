// Component: ContactForm
// A validated contact form with name, email, phone, subject, and message fields.
// Uses useFormValidation from utilis for validation and submission logic.
// The map iframe is rendered alongside the form in a two-column layout.

import { useState } from "react";
import { useFormValidation } from "../../../utilis/useFormValidation";

// Subject options for the dropdown
const SUBJECT_OPTIONS = [
    { value: "",              label: "Select a subject" },
    { value: "coaching",      label: "Coaching" },
    { value: "consultation",  label: "Consultation" },
    { value: "support",       label: "Support" },
    { value: "other",         label: "Other" },
] as const;

// Google Maps embed URL for our location
const MAP_EMBED_URL =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.669658423851!2d106.66470231462245!3d10.76262299233076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec3c161939f%3A0x400f76edffbed0!2zMTIzIMSQxrDhu51uZyBBQkMsIFF14bqtbiBYWVosIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1sen!2s!4v1634567890123!5m2!1sen!2s";

interface ContactFormFields {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

const INITIAL_FORM: ContactFormFields = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
};

const ContactForm = () => {
    const [form, setForm] = useState<ContactFormFields>(INITIAL_FORM);
    const { errors, isSubmitting, submitForm, clearErrors } = useFormValidation();

    // Generic change handler — updates the matching field by key
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        // Clear errors as soon as the user starts editing
        if (errors[name]) clearErrors();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await submitForm(
            // Only pass fields the validator knows about (name, email, phone, message)
            { name: form.name, email: form.email, phone: form.phone, message: form.message },
            { successMessage: "Message sent! We will get back to you as soon as possible." },
            () => {
                // Reset form on success
                setForm(INITIAL_FORM);
            }
        );
        return success;
    };

    return (
        <section className="contact-form-section-f">
            <div className="row">
                {/* ── Contact form column ───────────────────────────── */}
                <div className="col-md-6">
                    <div className="contact-form">
                        <h2>Send Us a Message</h2>
                        <form onSubmit={handleSubmit} noValidate>

                            {/* Full name */}
                            <div className="form-group">
                                <label htmlFor="name">Full Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Your full name"
                                    required
                                />
                                {errors.name && (
                                    <span style={{ color: "#dc3545", fontSize: "0.85rem", marginTop: 4, display: "block" }}>
                                        {errors.name}
                                    </span>
                                )}
                            </div>

                            {/* Email */}
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                />
                                {errors.email && (
                                    <span style={{ color: "#dc3545", fontSize: "0.85rem", marginTop: 4, display: "block" }}>
                                        {errors.email}
                                    </span>
                                )}
                            </div>

                            {/* Phone — required by validator */}
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="e.g. 0912345678"
                                    required
                                />
                                {errors.phone && (
                                    <span style={{ color: "#dc3545", fontSize: "0.85rem", marginTop: 4, display: "block" }}>
                                        {errors.phone}
                                    </span>
                                )}
                            </div>

                            {/* Subject — not validated, just captured */}
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                >
                                    {SUBJECT_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Message — optional, max 500 chars */}
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell us how we can help you..."
                                />
                                {/* Character counter for the optional message field */}
                                <span style={{ fontSize: "0.8rem", color: form.message.length > 450 ? "#dc3545" : "#999" }}>
                                    {form.message.length}/500
                                </span>
                                {errors.message && (
                                    <span style={{ color: "#dc3545", fontSize: "0.85rem", marginTop: 4, display: "block" }}>
                                        {errors.message}
                                    </span>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="btn-submit"
                                disabled={isSubmitting}
                                style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* ── Map column ───────────────────────────────────── */}
                <div className="col-md-6">
                    <div className="contact-map">
                        <h2>Our Location</h2>
                        <div className="map-placeholder">
                            <iframe
                                src={MAP_EMBED_URL}
                                width="100%"
                                height="400"
                                style={{ border: 0, borderRadius: 12 }}
                                allowFullScreen
                                loading="lazy"
                                title="MindCare office location"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
