import HeroCarousel from "../../components/User/home/heroCarousel";
import Introduction from "../../components/User/home/Introduction";
import TeamSection from "../../components/User/home/TeamSection";
import { teamMembers } from "../../data/TeamMember";
import CouuseSection from "../../components/User/home/CourseSection";
import { courses } from "../../data/CourseData";
import BookSection from "../../components/User/home/BookSection";
import { books } from "../../data/BookData";
import BlogPostSection from "../../components/User/home/BlogSection";
import { blogs } from "../../data/Blog";
import TestimonialSection from "../../components/User/home/TestimonialSection";
import { testimonials } from "../../data/Testimonial";

import { images } from "../../assets/images";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <HeroCarousel />
      <Introduction />
      <TeamSection teamMembers={teamMembers} itemsPerPage={3} />
      <CouuseSection courses={courses} itemsPerPage={3} />
      <BookSection books={books} itemsPerPage={3} />

      <section className="guarantee">
        <div className="container">
          <img
            src={images.guarantee}
            alt="Guarantee Logo"
            className="guarantee-logo"
          />
          <p>
            We are dedicated to delivering the finest experiences through
            high‑quality services.
          </p>
          <p>
            With our unwavering commitment, your satisfaction is always
            guaranteed.
          </p>
        </div>
      </section>

      <TestimonialSection testimonials={testimonials} />

      <section className="benefits">
        <div className="container">
          <div
            className="benefits-bg"
            style={{ backgroundImage: `url(${images.hero.h3})` }}
          />
          <div className="benefits-content">
            <h2 className="benefits-title">Benefits for Subscribers</h2>
            <div
              className="benefits-list"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <ul className="benefits-left column" style={{ flex: 1 }}>
                <li>Access to professional coaching courses</li>
                <li>Personalized support from expert coaches</li>
                <li>Active learner community with mutual support</li>
                <li>Free resources and tools for self‑development</li>
              </ul>
              <ul className="benefits-right column" style={{ flex: 1 }}>
                <li>Special discounts on products and services</li>
                <li>Regular updates on the latest coaching trends</li>
                <li>Recognized course completion certificates</li>
                <li>24/7 support via email and live chat</li>
              </ul>
            </div>
            <Link to="/booking" className="benefits-btn">
              Join Us
            </Link>
          </div>
        </div>
      </section>

      <BlogPostSection blogs={blogs} itemsPerPage={6} />
    </>
  );
};

export default Home;
