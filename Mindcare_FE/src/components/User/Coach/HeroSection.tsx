
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>
            Find Your Perfect Online Coach
            <br />
            and Transform Your Life Today
          </h1>
          <p>
            Ready to unlock your true potential? Whether you're seeking personal
            growth, career advancement, or family healing — our platform
            connects you with certified coaches tailored to your unique needs.
          </p>
          <div className="process">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Explore</h3>
              <p>
                Browse through our diverse list of expert coaches across various
                niches to find the perfect match for your goals.
              </p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Connect</h3>
              <p>
                Book a free consultation to discuss your needs and understand
                how your chosen coach can help you achieve success.
              </p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Transform</h3>
              <p>
                Begin your personalized coaching journey and take actionable
                steps toward your dreams.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="booking">
        <Link to="/booking">Book Without Selection</Link>
      </div>
    </>
  );
};
export default HeroSection;
