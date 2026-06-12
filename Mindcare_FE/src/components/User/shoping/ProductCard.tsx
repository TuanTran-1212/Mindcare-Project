// import "../../assets/css/shoppingBook.css";
// import "../../assets/css/shoppingCourse.css";

import { Link } from "react-router-dom";
// import type { Book, Course } from "../../../data/Types";
import { useShoppingCart } from "../../../utilis/cart/useCart";
import { showNotification } from "../../../utilis/Notification";
import type { BookGet } from "../../../services/BookListService";
import type { CourseGet } from "../../../services/CourseListService";
import { baseUrl } from "../../../services/api";

const ProductCard = (props: BookGet | CourseGet) => {
  const { id, title, finalPrice, originalPrice, discountPercent, imgUrl } =
    props;

  // Xác định loại sản phẩm
  const isBook = "pages" in props;
  const detailPath = isBook ? `/books/${id}` : `/courses/${id}`;

  // Lấy categoryName đúng theo loại
  let categoryName = "";
  if (isBook) {
    categoryName = (props as BookGet).bookCategoryName;
  } else {
    categoryName = (props as CourseGet).courseCategoryName;
  }

  const { addItem } = useShoppingCart(); // ← cùng context với Header và CartSidebar

  /**
   * Thêm sách vào giỏ:
   * - addItem tự động mở CartSidebar qua context (setIsCartOpen(true))
   * - totalItems trong Header cập nhật ngay lập tức
   */
  const handleAddToCart = () => {
    addItem({
      id: id,
      title: title,
      price: finalPrice,
      image: imgUrl,
      productType: isBook ? "BOOK" : "COURSE",
    });
   
    showNotification("Added to cart!", "success");
  };

  function getStars(rating: number) {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <i key={i} className="fas fa-star" />
      ) : (
        <i key={i} className="far fa-star" />
      ),
    );
  }

  return (
    <>
      <Link to={detailPath} className="product-card-link">
        <div className="product-card">
          <div className="product-image">
            <img src={`${baseUrl}${imgUrl}`} alt={title} />
            {/* {isBestSeller && (
              <span className="best-seller-badge">
                <i className="fas fa-fire"></i> Best Seller
              </span>
            )} */}
            {discountPercent > 0 && (
              <span className="sale-badge">
                -{Math.round(discountPercent)}%
              </span>
            )}
          </div>
          <div className="product-info">
            <div className="product-header">
              <h3 className="product-title">{title}</h3>
            </div>
            <div className="product-badges">
              {/* {isNew && <span className="new-badge">NEW</span>} */}
              <span className="category-badge">{categoryName}</span>
            </div>

            <div className="rating-badge">
              <span className="rating-number">{5}.0</span>${getStars(5)}
              <span className="review-count">(127)</span>
            </div>

            <div className="product-price">
              <span className="current-price-c">${finalPrice}</span>
              <span className="original-price-c">${originalPrice}</span>
            </div>
            <button
              className="add-to-cart-btn"
              onClick={(e) => {
                e.preventDefault(); // ngăn Link navigate khi click button
                handleAddToCart();
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};
export default ProductCard;
