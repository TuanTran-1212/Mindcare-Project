import { images } from "../../../assets/images";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      {/* ==================== CAROUSEL (Bootstrap) ==================== */}
      <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={images.hero.h1}
              className="d-block w-100"
              alt="Slide 1"
            />
            <div className="carousel-overlay hero-shop" />
            <div className="carousel-caption">
              <h2>Books</h2>
              <p>Treanding Books</p>
              <Link to="/books" className="hero-btn">
                Watch Now
              </Link>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={images.hero.h2}
              className="d-block w-100"
              alt="Slide 2"
            />
            <div className="carousel-overlay" />
            <div className="carousel-caption d-none d-md-block">
              <h2>Courses</h2>
              <p>Trending Courses</p>
              <Link to="/courses" className="hero-btn">
                Watch Now
              </Link>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={images.hero.h3}
              className="d-block w-100"
              alt="Slide 3"
            />
            <div className="carousel-overlay" />
            <div className="carousel-caption">
              <h2>Coaching</h2>
              <p>Join Coaching</p>
              <Link to="" className="hero-btn">
                Xem Ngay
              </Link>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* ==================== PROMOTIONAL SECTION ==================== */}
      <section className="promotional-section">
        <div className="container">
          <div className="promo-content">
            <h2 className="promo-title">Ưu đãi học tập đặc biệt</h2>
            <div className="voucher-banner">
              <img src={images.discount} alt="Voucher giảm giá khóa học" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default HeroSection;
