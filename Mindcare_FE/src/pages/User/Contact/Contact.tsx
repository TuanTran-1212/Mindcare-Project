// Page: Contact
// Route: /contact
// Composed of three independent components:
//   - ContactInfo   → address, phone, email cards (no data needed)
//   - ContactForm   → validated form + Google Maps embed
//   - FaqSection    → accordion FAQ list
// All text content is in English. Vietnamese comments preserved where originally present.

import ContactInfo from "../../../components/User/Contact/ContactInfo";
import ContactForm from "../../../components/User/Contact/ContactForm";
import FaqSection from "../../../components/User/Contact/FAQSection";


const Contact = () => (
    <>
        {/* Page title */}
        <h1 className="contact-title">Contact Us</h1>

        <div className="container">
            {/* 3 cards: address, phone, email */}
            <ContactInfo />

            {/* Validated contact form + Google Maps */}
            <ContactForm />

            {/* Accordion FAQ */}
            <FaqSection />
        </div>
    </>
);

export default Contact;
