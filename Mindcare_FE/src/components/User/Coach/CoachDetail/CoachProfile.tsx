// Component: CoachProfile
// Renders all coach profile sections except testimonials:
//   - Profile header (avatar, name, tags, rating)
//   - Bio paragraphs
//   - Qualifications list
//   - Specialties grid (uses map over paired specialty+benefit data)
// The sidebar (benefits + book CTA) is also rendered here because it
// consumes the same specialty data — benefits are extracted from specialties.


import type { TeamMember } from "../../../../data/Types";
import { Link } from "react-router-dom";

interface CoachProfileProps {
    coach: TeamMember;
}

const CoachProfile = ({ coach }: CoachProfileProps) => {
    return (
        <div className="coach-profile">
            {/* ── Main content column ──────────────────────────────────── */}
            <div className="main-content-user">

                {/* Profile header: avatar + name + tags */}
                <div className="profile-header">
                    <img
                        src={coach.image}
                        alt={coach.name}
                        className="avatar-large"
                    />
                    <div className="profile-info">
                        <h2 className="name">
                            {coach.name}{" "}
                            <span className="certified">CERTIFIED</span>
                        </h2>
                        <div className="role">{coach.role}</div>
                        {coach.review && (
                            <div className="reviews">{coach.review}</div>
                        )}
                        <div className="tags">
                            {coach.tags.map((tag) => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* All detail sections stacked in profile-content */}
                <div className="profile-content">

                    {/* Bio paragraphs */}
                    <div className="bio-section">
                        <h3>About {coach.name.split(" ")[0]}</h3>
                        {coach.Biography.map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </div>

                    {/* Qualifications */}
                    {coach.qualifications && coach.qualifications.length > 0 && (
                        <div className="experience-section">
                            <h3>Experience & Qualifications</h3>
                            <ul>
                                {coach.qualifications.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Specialties — mapped from paired specialty+benefit data */}
                    {coach.specialties && coach.specialties.length > 0 && (
                        <div className="specialties-section">
                            <h3>Specialties</h3>
                            <div className="specialties-grid">
                                {coach.specialties.map((specialty) => (
                                    <div key={specialty.label} className="specialty">
                                        {specialty.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Sidebar: benefits extracted from specialties + book CTA ── */}
            <aside className="sidebar-user">
                <div className="benefits-section">
                    <h3>What {coach.name.split(" ")[0]} Can Bring to You</h3>
                    <ul className="benefits-list">
                        {coach.specialties?.map((specialty) => (
                            <li key={specialty.label}>{specialty.benefit}</li>
                        ))}
                    </ul>
                    <Link to="/booking" className="btn btn-book-aside">
                        Book a Session
                    </Link>
                </div>
            </aside>
        </div>
    );
};

export default CoachProfile;
