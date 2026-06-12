import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { images } from "../../../assets/images";
interface FeaturedItem {
  id: number;
  image: string;
  tittle: string;

  // add more
}
// danh sách items carousel
const featuredItems: FeaturedItem[] = [
  { id: 0, image: images.hero.h1, tittle: "hero1" },
  { id: 1, image: images.hero.h2, tittle: "hero2" },
  { id: 2, image: images.hero.h3, tittle: "hero3" },
  // add more
];

// mapping carousel items
type RenderFeaturedItemsProps = FeaturedItem & {
  onClick: () => void;
  isActive: boolean;
};
const RenderFeaturedItems = ({
  image,
  tittle,
  isActive,
  onClick,
}: RenderFeaturedItemsProps) => (
  <div
    className={`featured-item ${isActive ? "active" : ""}`}
    data-image={image}
    onClick={onClick}
  >
    <img src={image} alt={tittle} />
  </div>
);

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0); //index của item hiện tại
  const [heroSrc, setHeroSrc] = useState<string>(featuredItems[0]?.image || ""); // src ban đầu của ảnh hero

  const heroImageRef = useRef<HTMLImageElement>(null);
  const intervalRef = useRef<number | null>(null);

  // Xử lý click vào item
  const handleItemClick = (index: number, imageUrl: string) => {
    const img = heroImageRef.current;
    if (!img) return;

    // Fade out
    img.style.transition = "opacity 200ms";
    img.style.opacity = "0.7";

    setTimeout(() => {
      setHeroSrc(imageUrl); // Cập nhật src qua state (React sẽ render lại)

      // Fade in
      img.style.transition = "opacity 400ms";
      img.style.opacity = "1";
    }, 200);

    setCurrentIndex(index);
  };

  // Auto rotate
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % featuredItems.length;
      const nextImage = featuredItems[nextIndex].image;
      handleItemClick(nextIndex, nextImage);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex]);

  return (
    <section className="hero-section">
      <div className="hero-background">
        <img
          id="heroImage"
          src={heroSrc}
          ref={heroImageRef}
          className="bg-image"
        />
        <div className="hero-overlay" />
      </div>
      <div className="hero-content">
        <h1 className="hero-title">
          MindCare
          <br />
          <span className="highlight">
            Caring Your Mind - Leading Your Life
          </span>
        </h1>
        <p className="hero-description">
          Lorem ipsum is simply dummy text of the printing and typesetting
          industry. Lorem ipsum has been the industry's since the 1900s
        </p>
        <div className="book-learn-buttons">
          <Link to="/Booking" className="btn-booking">
            Booking
          </Link>

          <Link to="about-us" className="btn-learn">
            Learn More <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
      {/* Featured Images Navigation (Bottom Inside Hero) */}
      <div className="featured-carousel">
        <div className="featured-images">
          {featuredItems.map((item, index) => (
            <RenderFeaturedItems
              key={item.id}
              {...item}
              onClick={() => handleItemClick(index, item.image)}
              isActive={currentIndex === index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
