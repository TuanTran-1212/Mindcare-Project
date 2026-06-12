// src/components/common/PaginationArrows.tsx
import React from "react";


interface PaginationArrowsProps {
  currentPage: number; // Trang đang xem (bắt đầu từ 1)
  totalPages: number; // Tổng số trang
  onPageChange: (page: number) => void; // Callback khi người dùng chọn trang
  className?: string; // Class CSS tuỳ chọn từ bên ngoài truyền vào
}

/**
 * Component phân trang dạng mũi tên (Previous / Page Info / Next)
 * tái sử dụng cho Team, Courses, Books, Blog, Coaches...
 */
export const PaginationArrows = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationArrowsProps) => {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className={`pagination-container ${className}`}>
      <div className="pagination-arrows">
        {/* Nút Previous */}
        <button
          className={`pagination-arrow ${!hasPrev ? "disabled" : ""}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrev}
          aria-label="Trang trước"
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        {/* Thông tin trang hiện tại */}
        <span className="pagination-info">
          Page {currentPage} / {totalPages}
        </span>

        {/* Nút Next */}
        <button
          className={`pagination-arrow ${!hasNext ? "disabled" : ""}`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
          aria-label="Trang sau"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

/**
 * PaginationNumbers
 * Phân trang dạng số: [Trước] [1] [2] [3] [Sau]
 *
 * Tái sử dụng được cho mọi page có danh sách:
 * Blog, Shop Books, Shop Courses, Coaches, v.v.
 *
 * Cách dùng:
 *   <PaginationNumbers
 *     currentPage={currentPage}
 *     totalPages={totalPages}
 *     onPageChange={goToPage}
 *   />
 */
export const PaginationNumbers: React.FC<PaginationArrowsProps> = ({
  // dùng lại interface của arrow
  currentPage,
  totalPages,
  onPageChange,
  className = "", // mặc định rỗng nếu không truyền vào
}) => {
  // Tạo mảng số trang [1, 2, 3, ..., totalPages]
  // Array.from({ length: n }) → tạo mảng rỗng có n phần tử
  // Callback (_, i) => i + 1 → bỏ qua giá trị (undefined), dùng index i
  //   i = 0 → 1, i = 1 → 2, ..., i = n-1 → n
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  /**
   * handleClick - Xử lý sự kiện click chung cho tất cả các nút
   * @param e   - MouseEvent từ thẻ <a>
   * @param page - Số trang muốn chuyển tới
   *
   * Tại sao cần e.preventDefault()?
   * Thẻ <a href="#"> nếu không chặn sẽ scroll lên đầu trang (behavior mặc định)
   * preventDefault() ngăn hành động đó, chỉ chạy onPageChange
   */
  const handleClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    onPageChange(page);
  };

  return (
    // aria-label giúp screen reader đọc đúng vùng điều hướng
    <nav
      aria-label="Pagination"
      className={`pagination-container ${className}`}
    >
      {/* Bootstrap pagination: ul > li.page-item > a.page-link */}
      <ul className="pagination">
        {/* ── Nút TRƯỚC ─────────────────────────────────────────── */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          {/*
            currentPage === 1 → thêm class "disabled" → CSS làm mờ + pointer-events: none
            tabIndex={-1}     → không focus được bằng Tab khi disabled (accessibility)
          */}
          <a
            className="page-link"
            href="#"
            onClick={(e) => handleClick(e, currentPage - 1)}
            tabIndex={currentPage === 1 ? -1 : undefined}
            aria-label="Trang trước"
          >
            Previous
          </a>
        </li>

        {/* ── Số trang ───────────────────────────────────────────── */}
        {pages.map((page) => (
          <li
            key={page} // key bắt buộc khi render danh sách trong React
            className={`page-item ${page === currentPage ? "active" : ""}`}
            // page === currentPage → thêm class "active" → CSS highlight màu xanh
            aria-current={page === currentPage ? "page" : undefined}
            // aria-current="page" → screen reader biết đây là trang đang active
          >
            <a
              className="page-link"
              href="#"
              onClick={(e) => handleClick(e, page)}
            >
              {page} {/* Hiển thị số trang */}
            </a>
          </li>
        ))}

        {/* ── Nút SAU ────────────────────────────────────────────── */}
        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
        >
          {/*
            currentPage === totalPages → đang ở trang cuối → disabled
          */}
          <a
            className="page-link"
            href="#"
            onClick={(e) => handleClick(e, currentPage + 1)}
            tabIndex={currentPage === totalPages ? -1 : undefined}
            aria-label="Trang sau"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};
