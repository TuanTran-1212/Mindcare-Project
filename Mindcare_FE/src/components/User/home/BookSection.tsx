// src/components/TeamSection/TeamSection.tsx

import type { Book } from "../../../data/Types";
import { PaginationArrows } from "../common/pagination/Pagination";
import { usePagination } from "../../../utilis/usePagination";
import Items from "../common/itemList/ItemList";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../../../utilis/cart/useCart";
import { showNotification } from "../../../utilis/Notification";

interface BookSectionProps {
  books: Book[];
  itemsPerPage?: number;
}

const BookSection = ({ books, itemsPerPage = 6 }: BookSectionProps) => {
  const {
    items: currentBooks,
    currentPage,
    totalPages,
    goToPage,
  } = usePagination(books, itemsPerPage);
  const navigate = useNavigate();
  const { addItem } = useShoppingCart(); // ← cùng context với Header và CartSidebar

  function getStars(rating: number) {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <i key={i} className="fas fa-star" />
      ) : (
        <i key={i} className="far fa-star" />
      ),
    );
  }

  /**
   * Thêm sách vào giỏ:
   * - addItem tự động mở CartSidebar qua context (setIsCartOpen(true))
   * - totalItems trong Header cập nhật ngay lập tức
   */
  const handleAddToCart = (book: Book) => {
    addItem({
      title: book.name,
      price: `$${book.price}.00`,
      image: book.image,
    });
    showNotification("Đã thêm vào giỏ hàng!", "success");
  };

  return (
    <section className="books">
      <div className="container">
        <div className="books-header">
          <span className="books-badge">SHOP</span>
          <h3 className="books-title">
            Explore Our Collection of Coaching Books and Resources
          </h3>
        </div>

        <Items<Book>
          items={currentBooks}
          columns={3}
          gap="2rem"
          renderItem={(book) => (
            <div className="book-card">
              <div
                className="book-image"
                style={{ backgroundImage: `url(${book.image})` }}
                onClick={() => navigate(`/books/${book.id}`)}
              />
              <div className="book-content">
                <div className="book-header">
                  <div className="book-rating">{getStars(book.rating)}</div>
                  <div className="book-price">
                    <span
                      className="original-price-c"
                      style={{ marginRight: 4, fontSize: 14 }}
                    >
                      ${book.originalPrice}
                    </span>
                    <span className="discounted-price">${book.price}</span>
                  </div>
                </div>
                <h4 className="book-name">{book.name}</h4>
                <p className="book-description">{book.description}</p>
                <p className="book-meta">
                  <span>
                    <i className="fas fa-book" /> {book.pages} Pages
                  </span>
                </p>
                <span
                  className="book-btn"
                  onClick={() => handleAddToCart(book)}
                >
                  Buy Now
                </span>
              </div>
            </div>
          )}
        />

        {totalPages > 1 && (
          <PaginationArrows
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        )}
      </div>
    </section>
  );
};

export default BookSection;
