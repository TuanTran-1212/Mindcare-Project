// components/common/Pagination.tsx
import React from 'react';
import { getVisiblePages } from "../../../utilis/PagnitionAdmin";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <ul className="pagination mb-0" id="paginationCategories">
      <ul className={`pagination justify-content-end ${className}`}>
        {/* Previous Button */}
        <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <i className="fas fa-chevron-left me-1"></i>
            Previous
          </button>
        </li>

        {/* Page Numbers */}
        {visiblePages.map((page, index) => {
          if (page === -1) {
            return (
              <li key={`dots-${index}`} className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            );
          }
          return (
            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
              <button
                className="page-link"
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          );
        })}

        {/* Next Button */}
        <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
            <i className="fas fa-chevron-right ms-1"></i>
          </button>
        </li>
      </ul>
    </ul>
  );
};

export default Pagination;