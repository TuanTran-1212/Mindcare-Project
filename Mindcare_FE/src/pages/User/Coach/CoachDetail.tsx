// Page: CoachDetail
// Route: /coach/:id
// Fetches coach by id from teamMembers data.
// Splits into two components:
//   - CoachProfile  → header, bio, qualifications, specialties, sidebar
//   - CoachTestimonials → up to 3 reviews (future: fetch by coachId from API)

import { useParams, Link } from "react-router-dom";
import { teamMembers } from "../../../data/TeamMember";
import { testimonials } from "../../../data/Testimonial";
import CoachProfile from "../../../components/User/Coach/CoachDetail/CoachProfile";
import CoachTestimonials from "../../../components/User/Coach/CoachDetail/Testimonial";


const CoachDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Find the coach whose id matches the URL param
  const coach = teamMembers.find((member) => member.id === Number(id));

  // Not found guard — shown when id is invalid or coach doesn't exist
  if (!coach) {
    return (
      <div style={{ textAlign: "center", padding: "120px 20px" }}>
        <h2 style={{ marginBottom: 16 }}>Coach not found</h2>
        <Link to="/coach" style={{ color: "#2e7d32", fontWeight: 600 }}>
          ← Back to Coaches
        </Link>
      </div>
    );
  }

  // In the future: fetch testimonials from API using coachId
  // const coachTestimonials = await fetchTestimonialsByCoachId(coach.id);
  // For now: use global testimonials list filtered by index as a placeholder
  const coachTestimonials = testimonials.slice(0, 3);

  return (
    <section className="container">
      {/* Profile sections: avatar, bio, qualifications, specialties, sidebar */}
      <CoachProfile coach={coach} />

      {/* Testimonials — max 3, future API: fetch by coachId */}

      <CoachTestimonials testimonials={coachTestimonials} />
    </section>
  );
};

export default CoachDetail;
