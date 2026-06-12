// src/components/TeamSection/TeamSection.tsx
import type { Course } from "../../../data/Types";
import { PaginationArrows } from "../common/pagination/Pagination";
import { usePagination } from "../../../utilis/usePagination";
import Items from "../common/itemList/ItemList";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../../../utilis/cart/useCart";
import { showNotification } from "../../../utilis/Notification";

interface CourseSectionProps {
  courses: Course[];
  itemsPerPage?: number;
}

/**
 * Component hiển thị Đội Ngũ với phân trang
 * Sử dụng Items để tái sử dụng
 */
const CouuseSection = ({
  courses,
  itemsPerPage = 6, // 6 items = 2 hàng × 3 cột
}: CourseSectionProps) => {
  const {
    items: currentCourses,
    currentPage,
    totalPages,
    goToPage,
  } = usePagination(courses, itemsPerPage);

  const navigate = useNavigate();
  const { addItem } = useShoppingCart(); // ← cùng context với Header và CartSidebar

  function getStars(rating: number) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    return stars;
  }
  const handleAddToCart = (course: Course) => {
    addItem({
      title: course.name,
      price: `$${course.price}.00`,
      image: course.image,
    });
    showNotification("Đã thêm vào giỏ hàng!", "success");
  };

  return (
    <>
      {/* Courses Section */}
      <section className="courses">
        <div className="container">
          <div className="courses-header">
            <span className="star">★</span>
            <div className="top-rated">Learn</div>{" "}
            <span className="star">★</span>
            <h3 className="courses-title">
              Ready to Build Your Coaching Career with Comprehensive Training?
            </h3>
          </div>
          {/* Sử dụng Items component */}
          <Items<Course>
            items={currentCourses}
            columns={3} // 3 cột mỗi hàng
            gap="2rem"
            renderItem={(course) => (
              <div className="course-card">
                <div
                  className="course-image"
                  style={{ backgroundImage: `url(${course.image})` }}
                  onClick={() => navigate(`/courses/${course.id}`)}
                ></div>
                <div className="course-content">
                  <div className="course-header">
                    <div className="course-rating">
                      {getStars(course.rating)}
                    </div>
                    <div className="course-price">
                      <span
                        className="original-price-c"
                        style={{ marginRight: 4, fontSize: 14 }}
                      >
                        ${course.originalPrice}
                      </span>
                      <span className="discounted-price">${course.price}</span>
                    </div>
                  </div>
                  <h4 className="course-name">{course.name}</h4>
                  <p className="course-description">{course.description}</p>
                  <p className="course-meta">
                    <span>
                      <i className="uil uil-clock" /> {course.duration}
                    </span>
                  </p>
                  <span
                    className="course-btn"
                    onClick={() => handleAddToCart(course)}
                  >
                    Buy Now
                  </span>
                </div>
              </div>
            )}
          />
          {/* pagination */}
          {totalPages > 1 && (
            <PaginationArrows
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default CouuseSection;
