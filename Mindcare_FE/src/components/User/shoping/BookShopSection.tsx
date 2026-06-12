/* eslint-disable @typescript-eslint/no-explicit-any */
// components/BookShopSection.tsx
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Book } from "../../../data/Types";
import { PaginationArrows } from "../common/pagination/Pagination";
import { usePagination } from "../../../utilis/usePagination";
import Items from "../common/itemList/ItemList";
import ProductCard from "./ProductCard";
import "../../../assets/css/filter.css";
interface BookSectionProps {
  books: Book[];
  itemsPerPage?: number;
  individual?: boolean;
  
}

// Filter options interface
interface FilterOptions {
  category: string;
  priceRange: string;
  popularity: string;
  rating: string;
}

const BookShopSection = ({
  books,
  itemsPerPage = 4,
  individual,
}: BookSectionProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    category: "",
    priceRange: "",
    popularity: "",
    rating: "",
  });

  // Filter books based on selected filters
  const filteredBooks = useMemo(() => {
    if (!individual) return books;

    const result = books.filter((book) => {
      // Category filter
      if (filters.category && book.category !== filters.category) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        switch (filters.priceRange) {
          case "under10":
            if (book.price >= 10) return false;
            break;
          case "10-20":
            if (book.price < 10 || book.price > 20) return false;
            break;
          case "20-30":
            if (book.price < 20 || book.price > 30) return false;
            break;
          case "30-50":
            if (book.price < 30 || book.price > 50) return false;
            break;
          case "over50":
            if (book.price <= 50) return false;
            break;
        }
      }

      // Popularity filter
      if (filters.popularity) {
        if (filters.popularity === "best-seller" && !book.isBestSeller) {
          return false;
        }
        if (filters.popularity === "newest" && !book.isNew) {
          return false;
        }
      }

      // Rating filter
      if (filters.rating) {
        const minRating = parseInt(filters.rating);
        if (book.rating < minRating) return false;
      }

      return true;
    });
    console.log("Filtered books:", result.length, "Filters:", filters); // ← THÊM DÒNG NÀY
    return result;
  }, [books, filters, individual]);

  // Get unique categories from books
  const categories = useMemo(() => {
    return [...new Set(books.map((book) => book.category))].filter(Boolean);
  }, [books]);

  // Use existing pagination hook with filtered books
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    items: currentBooks,
    currentPage,
    totalPages,
    goToPage,
  } = usePagination(filteredBooks, itemsPerPage);

  console.log("Current books:", currentBooks.length); // ← THÊM DÒNG NÀY

  // Reset to page 1 when filters change
  useEffect(() => {
    goToPage(1);
  }, [filters, goToPage]);

  // Update filter function
  const updateFilter = (key: keyof FilterOptions, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      category: "",
      priceRange: "",
      popularity: "",
      rating: "",
    });
  };

  const filterOrNot = individual;

  return (
    <>
      <section className="products-section" id="sach">
        <div className="container">
          <h2 className="section-title">Top Selling Books</h2>
          {filterOrNot ? (
            <div className="filters-section">
              {/* Category Filter */}
              <div className="filter-group">
                <label htmlFor="category-filter">Genre:</label>
                <select
                  id="category-filter"
                  value={filters.category}
                  onChange={(e) => updateFilter("category", e.target.value)}
                >
                  <option value="">All Genres</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="filter-group">
                <label htmlFor="price-filter">Range Price:</label>
                <select
                  id="price-filter"
                  value={filters.priceRange}
                  onChange={(e) => updateFilter("priceRange", e.target.value)}
                >
                  <option value="">All Price</option>
                  <option value="under10">Below $10</option>
                  <option value="10-20">$10 - $20</option>
                  <option value="20-30">$20 - $30</option>
                  <option value="30-50">$30 - $50</option>
                  <option value="over50">Above $50</option>
                </select>
              </div>

              {/* Popularity Filter - Checkboxes for multiple selection */}
              <div className="filter-group">
                <label htmlFor="popularity-filter">Popular:</label>
                <select
                  id="popularity-filter"
                  value={filters.popularity}
                  onChange={(e) => updateFilter("popularity", e.target.value)}
                >
                  <option value="">All State</option>
                  <option value="best-seller">Best Seller</option>
                  <option value="newest">Is New</option>
                </select>
              </div>
              {/* Rating Filter */}
              <div className="filter-group">
                <label htmlFor="rating-filter">Rating:</label>
                <select
                  id="rating-filter"
                  value={filters.rating}
                  onChange={(e) => updateFilter("rating", e.target.value)}
                >
                  <option value="">All Rating</option>
                  <option value="1">1 above</option>
                  <option value="2">2 above</option>
                  <option value="3">3 above</option>
                  <option value="4">4 above</option>
                  <option value="5">5 starts</option>
                </select>
              </div>

              {/* Reset Button */}
              <div className="filter-group">
                <button className="reset-btn" onClick={resetFilters}>
                  <i className="fas fa-refresh"></i> Reset Filter
                </button>
              </div>

              {/* Show number of results */}
              <div className="filter-group results-count">
                <span>Found {filteredBooks.length} Results</span>
              </div>
            </div>
          ) : (
            <div className="section-link-wrapper">
              <Link className="section-link" to="/books">
                View All Books
              </Link>
            </div>
          )}

          <Items<Book>
            items={currentBooks}
            columns={4}
            gap="1rem"
            renderItem={(book) => <ProductCard key={book.id} {...book} />}
          />

          {/* Pagination - Giữ nguyên không cần sửa */}
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

export default BookShopSection;
