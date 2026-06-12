import { useEffect, useState } from "react";

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/*-- Go-to-Top Button --*/}

      <button
        id="goToTopBtn"
        className={`go-to-top-btn ${isVisible ? "show" : ""}`}
        onClick={scrollToTop}
        aria-label="Go to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  );
};
export default GoToTopButton;
