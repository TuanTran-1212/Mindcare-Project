import { images } from "../../assets/images";


import OurTeamSection from "../../components/User/about-us/OurTeamSection";
import { teamMembers } from "../../data/TeamMember";
import ActivitiesCarousel from "../../components/User/about-us/ActivitiesCarousel";
import { activities } from "../../data/ActivitiesData";

const AboutUs = () => {
  return (
    <>
      <>
        {/* Hero */}
        <section className="hero-section">
          <div className="hero-background">
            <img id="heroImage" src={images.hero.h1} className="bg-image" />
            <div className="hero-overlay" />
          </div>
          <div className="hero-content">
            <h1 className="hero-title">
              About <span className="highlight">MindCare</span> - Leading Your
              Mind
            </h1>
            <div className="hero-description">
              <p>
                MindCare is dedicated to nurturing mental well-being and
                empowering individuals through professional coaching and
                transformative experiences.
              </p>
            </div>
          </div>
        </section>
        {/* Vision & Mission & Core */}
        <section className="section">
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 40,
                flexWrap: "wrap",
                marginBottom: 50,
              }}
            >
              <div
                style={{
                  flex: 1,
                  minWidth: 300,
                  borderRadius: 20,
                  background: "linear-gradient(to top, #023602, #065e06)",
                }}
                className="green-bg p-5"
              >
                <h2>VISION</h2>
                <p>
                  To create a world where mental well-being is prioritized,
                  empowering individuals to lead fulfilling lives through
                  professional coaching and transformative experiences.
                </p>
              </div>
              <div
                style={{
                  flex: 1,
                  minWidth: 300,
                  borderRadius: 20,
                  background: "linear-gradient(to top, #023602, #065e06)",
                }}
                className="green-bg p-5"
              >
                <h2>MISSION</h2>
                <p>
                  To provide exceptional coaching services that nurture mental
                  health, foster personal growth, and guide individuals towards
                  achieving their full potential.
                </p>
              </div>
              {/* Core Values */}
              <div
                style={{
                  backgroundColor: "#EFEFEF",
                  marginTop: 30,
                  padding: 50,
                  borderRadius: 20,
                }}
              >
                <h2 style={{ fontSize: 55, paddingBottom: 50 }}>CORE VALUES</h2>
                <p style={{ fontSize: 25 }}>
                  Compassion - Integrity - Excellence - Continuous Learning -
                  Community Responsibility
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Our Commitments */}
        <section className="section" style={{ backgroundColor: "#EFEFEF" }}>
          <div className="container">
            <h2 className="mb-5" style={{ color: "#065e06" }}>
              OUR COMMITMENTS
            </h2>
            <div className="cards">
              <div className="card-User ">
                <h3>EXPERTISE</h3>
                <p>
                  Our team of certified coaches and mental health professionals
                  brings years of experience in personal development and
                  coaching.
                </p>
              </div>
              <div className="card-User ">
                <h3>TRUST</h3>
                <p>
                  Thousands of clients have achieved lasting transformation and
                  continue to trust us for their mental well-being journey.
                </p>
              </div>
              <div className="card-User ">
                <h3>DEDICATION</h3>
                <p>
                  We accompany you every step of the way until you reach your
                  goals and live a fulfilling life.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Our Team */}
        <OurTeamSection teamMembers={teamMembers} itemsPerPage={4} />
        {/**Patners */}
        <section className="section">
          <div className="container">
            <h2>OUR PARTNERS</h2>
            <div className="partners">
              <img src={images.logo.lo1} alt="Partner 1" />
              <img src={images.logo.lo2} alt="Partner 2" />
              <img src={images.method.m2} alt="Partner 2" />
              <img src={images.method.m1} alt="Partner 2" />
              <img src={images.method.m3} alt="Partner 2" />
              {/* Add more partner logos as needed */}
            </div>
          </div>
        </section>
        {/**Activities */}
        <ActivitiesCarousel activities={activities} />
      </>
    </>
  );
};
export default AboutUs;
