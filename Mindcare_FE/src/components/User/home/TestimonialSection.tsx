// src/components/TeamSection/TeamSection.tsx
import React from "react";
import type { Testimonial } from "../../../data/Types";


interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

/**
 * Component hiển thị đánh giá với phân trang

 */
const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  testimonials,
}) => {
  return (
    <>
      {/* Courses Section */}
      <section className="testimonials">
        <div className="container-fluid">
          <h2 className="testimonials-title">Top Comments</h2>
          <div className="testimonial-carousel">
            <div className="testimonial-wrapper">
              <div className="testimonial-track" id="testimonial-track">
                {/* Sử dụng map component */}
                {testimonials.map((testimonials) => (
                  <div className="testimonial-card" key={testimonials.id}>
                    <img
                      src={testimonials.avatar}
                      alt="Avatar"
                      className="testimonial-avatar"
                    />
                    <div className="testimonial-author">
                      {testimonials.name}
                    </div>
                    <p>{testimonials.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialSection;
