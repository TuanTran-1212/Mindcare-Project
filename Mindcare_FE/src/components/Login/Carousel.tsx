// src/components/auth/Carousel.tsx
import  { useState, useEffect } from "react";

interface CarouselProps {
  slides: string[];
  images: string[];
}

/**
 * Carousel - shared image + text slider used on Login and ForgotPassword pages.
 * Mirrors the bullet/image switching logic from the original login.js.
 */
const Carousel = ({ slides, images }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-advance every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleBulletClick = (index: number) => {
    setActiveIndex(index);
  };

  const textTranslateY = -(activeIndex * 2.5);

  return (
    <div className="cLogin">
      <div className="images-wrapper">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            className={`image img-${i + 1}${activeIndex === i ? " show" : ""}`}
            alt={slides[i] ?? ""}
          />
        ))}
      </div>

      <div className="text-slider">
        <div className="text-wrap">
          <div
            className="text-group"
            style={{ transform: `translateY(${textTranslateY}rem)` }}
          >
            {slides.map((text, i) => (
              <h2 key={i}>{text}</h2>
            ))}
          </div>
        </div>

        <div className="bullets">
          {slides.map((_, i) => (
            <span
              key={i}
              data-value={i + 1}
              className={activeIndex === i ? "active" : ""}
              onClick={() => handleBulletClick(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
