/* eslint-disable @typescript-eslint/no-explicit-any */
// import "../../assets/css/styles.css";
import { useState, useMemo, useEffect } from "react";
// Filter options interface
interface FilterOptions {
  category: string;
  priceRange: string;
  popularity: string;
  rating: string;
}
// data type
// import type { Course } from "../../../data/Types";

// arrow to move between courses
import { PaginationArrows } from "../common/pagination/Pagination";
import { usePagination } from "../../../utilis/usePagination";

// grip
import Items from "../common/itemList/ItemList";

// insert into componet
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import {
  CourseService,
  type CourseGet,
} from "../../../services/CourseListService";
import {
  CourseCategoryService,
  type categoryGet,
} from "../../../services/CourseCategoryService";

interface BookSectionProps {
  
  itemsPerPage?: number;
  individual?: boolean;
}

const CourseShopSection = ({
  itemsPerPage = 6,
  individual = false,
}: BookSectionProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    category: "",
    priceRange: "",
    popularity: "",
    rating: "",
  });
  // FETCH COURSE DATA
  const [courses, setCourses] = useState<CourseGet[]>([]);
  const [categories, setCategories] = useState<categoryGet[]>([]);

  const fetchCategories = async () => {
    try {
      const data = await CourseCategoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.log("error getAll message", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await CourseService.getAll();
      console.log(data);
      setCourses(data);
    } catch (error) {
      console.log("error getAll message: ", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCourses();
    fetchCategories();
  }, []);
  //
  // Filter courses based on selected filters
  const filteredCourses = useMemo(() => {
    if (!individual) return courses;

    const result = courses.filter((course) => {
      // Category filter
      if (filters.category && course.courseCategoryName !== filters.category) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        console.log("Price filter active:", filters.priceRange);
        // console.log("Book price:", course.price);
        switch (filters.priceRange) {
          case "under100":
            if (course.finalPrice >= 100) return false;
            console.log(course.finalPrice);
            break;
          case "100-200":
            if (course.finalPrice < 100 || course.finalPrice > 200)
              return false;
            break;
          case "200-300":
            if (course.finalPrice < 200 || course.finalPrice > 300)
              return false;
            break;
          case "300-500":
            if (course.finalPrice < 300 || course.finalPrice > 500)
              return false;
            break;
          case "over500":
            if (course.finalPrice <= 500) return false;
            break;
        }
      }

      // // Popularity filter
      // if (filters.popularity) {
      //   if (filters.popularity === "best-seller" && !book.isBestSeller) {
      //     return false;
      //   }
      //   if (filters.popularity === "newest" && !book.isNew) {
      //     return false;
      //   }
      // }

      // Rating filter
      // if (filters.rating) {
      //   const minRating = parseInt(filters.rating);
      //   if (book.rating < minRating) return false;
      // }

      return true;
    });
    return result;
  }, [courses, filters, individual]);

  // Use existing pagination hook with filtered courses
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    items: currentCourses,
    currentPage,
    totalPages,
    goToPage,
  } = usePagination(filteredCourses, itemsPerPage);

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
          <h2 className="section-title">Trendind Courses</h2>

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
                    <option key={category.id} value={category.name}>
                      {category.name}
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
                  <option value="under100">Below $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200-300">$200 - $300</option>
                  <option value="300-500">$300 - $500</option>
                  <option value="over500">Above $500</option>
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
                <span>Found {filteredCourses.length} Results</span>
              </div>
            </div>
          ) : (
            <div className="section-link-wrapper">
              <Link className="section-link" to="/courses">
                View All Courses
              </Link>
            </div>
          )}

          <Items<CourseGet>
            items={currentCourses}
            columns={4}
            gap="1rem"
            renderItem={(course: CourseGet) => (
              <ProductCard key={course.id} {...course} />
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
    </>
  );
};
export default CourseShopSection;
