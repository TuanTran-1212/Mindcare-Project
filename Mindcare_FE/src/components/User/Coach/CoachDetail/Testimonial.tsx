// Component: CoachTestimonials
// Displays up to 3 customer reviews for a specific coach.
// In the future, replace the static prop with an API fetch using the coachId.


import type { Testimonial } from "../../../../data/Types";

interface CoachTestimonialsProps {
  // Testimonials passed in from parent — later replaced by API call with coachId
  testimonials: Testimonial[];
}

const MAX_TESTIMONIALS_DISPLAYED = 3;

const CoachTestimonials = ({ testimonials }: CoachTestimonialsProps) => {
  // Limit to max 3 testimonials regardless of how many are passed in
  const visibleTestimonials = testimonials.slice(0, MAX_TESTIMONIALS_DISPLAYED);

  if (visibleTestimonials.length === 0) return null;

  return (
    <div className="coach-profile main-content c" style={{padding: 0, margin: 0 ,marginLeft: 40, width: 810}}>
      
        <div className="testimonials-section">
          <h3>What Clients Say</h3>
          {visibleTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial">
              <p>"{testimonial.content}"</p>
              <cite>- {testimonial.name}</cite>
            </div>
          ))}
        </div>
        
    </div>
  );
};

export default CoachTestimonials;
