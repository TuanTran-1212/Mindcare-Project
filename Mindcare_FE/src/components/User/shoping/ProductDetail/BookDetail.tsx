// Page: BookDetail
// Route: /books/:id
// Fetches a book by id from BookData.
// Renders rich content using contentBlock[] — same pattern as BlogDetail.
// Includes: breadcrumb, product info, quantity selector, add-to-cart, description, related books.

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { books } from "../../../../data/BookData";
import { useShoppingCart } from "../../../../utilis/cart/useCart";
// import "../../../../assets/css/book-detail.css";

// ── Helpers ──────────────────────────────────────────────────────────────────

// Calculates the discount percentage between original and current price
const calcDiscountPercent = (original: number, current: number): number =>
  Math.round(((original - current) / original) * 100);

// Renders star icons based on a 1–5 rating
const renderStars = (rating: number) =>
  Array.from({ length: 5 }, (_, idx) => (
    <i
      key={idx}
      className={
        idx < Math.floor(rating) ? "fas fa-star" : "fas fa-star-half-alt"
      }
      style={{ color: "#ffc107" }}
    />
  ));

// ── Component ─────────────────────────────────────────────────────────────────

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem, openCart } = useShoppingCart();

  const [quantity, setQuantity] = useState(1);

  // Find the book matching the URL param
  const book = books.find((b) => b.id === Number(id));

  // Related books: up to 4 books excluding the current one
  const relatedBooks = books.filter((b) => b.id !== Number(id)).slice(0, 4);

  // Not found guard
  if (!book) {
    return (
      <div style={{ textAlign: "center", padding: "120px 20px" }}>
        <h2 style={{ marginBottom: 16 }}>Book not found</h2>
        <Link to="/books" style={{ color: "#065e06", fontWeight: 600 }}>
          ← Back to Books
        </Link>
      </div>
    );
  }

  const discountPercent = calcDiscountPercent(book.originalPrice, book.price);

  // Quantity controls — clamped between 1 and 10
  const increaseQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10));
  const decreaseQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleAddToCart = () => {
    // Add once per click; repeat for quantity (cart uses addItem which increments)
    for (let i = 0; i < quantity; i++) {
      addItem({
        title: book.name,
        price: `$${book.price.toFixed(2)}`,
        image: book.image,
      });
    }
    openCart();
  };

  return (
    <>
      {/* ── Breadcrumb ───────────────────────────────────────────── */}
      <section className="breadcrumb-section">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/shopping">Shop</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/books">Books</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {book.name}
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* ── Product info ─────────────────────────────────────────── */}
      <section className="product-detail-section">
        <div className="container">
          <div className="row">
            {/* Cover image */}
            <div className="col-md-6">
              <div className="product-gallery">
                <div className="main-image">
                  <img src={book.image} alt={book.name} className="img-fluid" />
                </div>
              </div>
            </div>

            {/* Info panel */}
            <div className="col-md-6">
              <div className="product-info">
                <h1 className="product-title">{book.name}</h1>

                {/* Star rating */}
                <div className="product-rating">
                  {renderStars(book.rating)}
                  <span className="rating-text">({book.rating}/5)</span>
                </div>

                {/* Price + discount */}
                <div className="product-price">
                  <span className="current-price">
                    ${book.price.toFixed(2)}
                  </span>
                  <span className="original-price">
                    ${book.originalPrice.toFixed(2)}
                  </span>
                  <span className="discount-badge">-{discountPercent}%</span>
                </div>

                {/* Meta info */}
                <div className="product-meta">
                  {book.author && (
                    <div className="meta-item">
                      <strong>Author</strong>
                      <span>{book.author}</span>
                    </div>
                  )}
                  {book.publisher && (
                    <div className="meta-item">
                      <strong>Publisher</strong>
                      <span>{book.publisher}</span>
                    </div>
                  )}
                  {book.publishYear && (
                    <div className="meta-item">
                      <strong>Published</strong>
                      <span>{book.publishYear}</span>
                    </div>
                  )}
                  <div className="meta-item">
                    <strong>Pages</strong>
                    <span>{book.pages}</span>
                  </div>
                  {book.language && (
                    <div className="meta-item">
                      <strong>Language</strong>
                      <span>{book.language}</span>
                    </div>
                  )}
                </div>

                {/* Quantity selector */}
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <div className="quantity-controls">
                    <button className="quantity-btn" onClick={decreaseQuantity}>
                      −
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      min={1}
                      max={10}
                      readOnly
                    />
                    <button className="quantity-btn" onClick={increaseQuantity}>
                      +
                    </button>
                  </div>
                </div>

                {/* Add to cart */}
                <div className="action-buttons">
                  <button
                    className="add-to-cart-btn-v2"
                    onClick={handleAddToCart}
                  >
                    <i
                      className="fas fa-shopping-cart"
                      style={{ marginRight: 8 }}
                    />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Rich description (contentBlock) ──────────────────────── */}
      <div className="container">
        <section className="product-description-section">
          <h2 className="section-title">About This Book</h2>
          <div className="description-content">
            <div className="description-text">
              {book.contentBlock?.map((block, idx) => {
                if (block.type === "paragraph")
                  return <p key={idx}>{block.text}</p>;

                if (block.type === "image")
                  return (
                    <img
                      key={idx}
                      src={block.src}
                      alt={block.alt ?? book.name}
                    />
                  );

                if (block.type === "heading")
                  return <h3 key={idx}>{block.text}</h3>;

                if (block.type === "quote")
                  return (
                    // <blockquote
                    //     key={idx}
                    //     style={{
                    //         fontSize: 20,
                    //         background: "#f0f7f0",
                    //         padding: "20px 24px",
                    //         borderLeft: "5px solid #065e06",
                    //         margin: "30px 0",
                    //         fontStyle: "italic",
                    //         borderRadius: "0 8px 8px 0",
                    //     }}
                    // >
                    //     "{block.text}"
                    //     <cite style={{ display: "block", marginTop: 10, fontWeight: "bold", fontStyle: "normal" }}>
                    //         — {block.src}
                    //     </cite>
                    // </blockquote>
                    null
                  );

                return null;
              })}

              {/* Fallback: show plain description when no contentBlock */}
              {!book.contentBlock && <p>{book.description}</p>}
            </div>
          </div>
        </section>
      </div>

      {/* ── Related books ────────────────────────────────────────── */}
      {relatedBooks.length > 0 && (
        <section className="container">
          <div className="related-products-section ">
            <h2 className="section-title">You May Also Like</h2>
            <div className="related-products-grid">
              {relatedBooks.map((related) => (
                <Link
                  to={`/books/${related.id}`}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  <div key={related.id} className="related-product-card">
                    <div className="product-image">
                      <img src={related.image} alt={related.name} />
                      <span
                        className="sale-badge"
                        style={{ width: 50, textAlign: "center" }}
                      >
                        -
                        {calcDiscountPercent(
                          related.originalPrice,
                          related.price,
                        )}
                        %
                      </span>
                    </div>
                    <div className="product-info">
                      <h4 className="product-title">{related.name}</h4>
                      <div className="product-price">
                        <span className="current-price-c">
                          ${related.price.toFixed(2)}
                        </span>
                        <span className="original-price-c">
                          ${related.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      <Link
                        to={`/books/${related.id}`}
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                        className="view-detail-btn"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BookDetail;
