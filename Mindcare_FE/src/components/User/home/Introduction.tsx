import { images } from '../../../assets/images';
import { useNavigate } from 'react-router-dom';


const Introduction = () => {
  const navigate = useNavigate();
  return (
    <>
      <>
        <div className="container">
          <section className="about-us" id="about">
            <div className="row">
              <div className="col-md-4">
                <p className="about-subtitle">About us</p>
                <h2>
                  Welcome to , <span className="highlight-text">MindCare</span>{" "}
                  the Best Destination for Tranquility
                </h2>
                <button type="button" className="about-btn" style={{marginBottom: 14}} onClick={()=> navigate("/about-us")}>
                  More About Us
                </button>
              </div>
              <div className="col-md-8">
                <div className="about-description">
                  <p>
                    MindCare was founded in 1990 with a vision to create
                    exceptional hospitality experiences that combine natural
                    beauty with world-class amenities and service. Our
                    commitment to excellence is reflected in every aspect of our
                    properties, from the thoughtfully designed architecture to
                    the lush landscaped gardens.
                  </p>
                </div>
                <div className="about-stats">
                  <div className="stat-item">
                    <h4>150 K+</h4>
                    <p>Guest Are Served</p>
                  </div>
                  <div className="stat-item">
                    <h4>25</h4>
                    <p>Villas &amp; Resorts</p>
                  </div>
                  <div className="stat-item">
                    <h4>12 +</h4>
                    <p>Locations</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div
                  className="video-thumb"
                  style={{
                    backgroundImage: `url(${images.aboutus.video})`,
                  }}
                >
                  <div className="overlay">
                    <a href="" className="play">
                      <i className="fa fa-play" aria-hidden="true" />
                      <span>Play Video</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <img src={images.aboutus.picture} alt="About Us" />
              </div>
            </div>
          </section>
          <section className="methods" id="features">
            <div className="row">
              <div className="col-12 text-center">
                <h2 className="method-subtitle">OUR METHODS</h2>
                <h3 className="method-title">About MindCare</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 text-center">
                <img
                  src={images.method.m1}
                  className="method-icon"
                  alt=""
                />
                <h4 className="method-heading">Top Coaches in Every Field</h4>
                <p className="method-text">
                  30+ years of experience in coaching and personal
                  transformation
                </p>
              </div>
              <div className="col-md-4 text-center">
                <img
                  src={images.method.m2}
                  className="method-icon"
                  alt=""
                />
                <h4 className="method-heading">
                  Tailored Coaching Experiences
                </h4>
                <p className="method-text">
                  A global coaching network of professional coaches and
                  certified mentors
                </p>
              </div>
              <div className="col-md-4 text-center">
                <img
                  src={images.method.m3}
                  className="method-icon"
                  alt=""
                />
                <h4 className="method-heading">Easy to Search and Book</h4>
                <p className="method-text">
                  A user-friendly platform to book coaching sessions, access
                  learning, and track your progress
                </p>
              </div>
            </div>
          </section>
        </div>
      </>
    </>
  );
};
export default Introduction;