// Component: ContactInfo
// Displays 3 static contact cards: address, phone, and email.
// No data source needed — content is hardcoded here since it doesn't change.

const CONTACT_CARDS = [
    {
        icon: "fas fa-map-marker-alt",
        title: "Address",
        lines: ["123 ABC Street, District XYZ", "Ho Chi Minh City, Vietnam"],
    },
    {
        icon: "fas fa-phone",
        title: "Phone",
        lines: ["+84 123 456 789", "+84 987 654 321"],
    },
    {
        icon: "fas fa-envelope",
        title: "Email",
        lines: ["info@mindcare.vn", "support@mindcare.vn"],
    },
] as const;

const ContactInfo = () => (
    <section className="contact-info">
        <div className="row">
            {CONTACT_CARDS.map((card) => (
                <div key={card.title} className="col-md-4">
                    <div className="contact-card">
                        <i className={card.icon} />
                        <h3>{card.title}</h3>
                        <p>
                            {card.lines.map((line, idx) => (
                                <span key={idx}>
                                    {line}
                                    {idx < card.lines.length - 1 && <br />}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export default ContactInfo;
