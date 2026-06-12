// utils/pagination.utils.tsx
import React from 'react';

// Method 1: Tính toán page numbers hiển thị
export const getVisiblePages = (currentPage: number, totalPages: number): number[] => {
  const delta = 2;
  const range: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
      range.push(i);
    }
  }

  const result: number[] = [];
  let last: number | null = null;

  for (const page of range) {
    if (last && page - last > 1) {
      result.push(-1);
    }
    result.push(page);
    last = page;
  }

  return result;
};

// Method 2: Tạo component Previous button
export const renderPrevButton = (currentPage: number, onPageChange: (page: number) => void) => {
  return (
    <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
      <button
        className="page-link"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <i className="fas fa-chevron-left"></i> Previous
      </button>
    </li>
  );
};

// Method 3: Tạo component Next button
export const renderNextButton = (currentPage: number, totalPages: number, onPageChange: (page: number) => void) => {
  return (
    <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
      <button
        className="page-link"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next <i className="fas fa-chevron-right"></i>
      </button>
    </li>
  );
};

// Method 4: Tạo component Page number
export const renderPageNumbers = (
  visiblePages: number[],
  currentPage: number,
  onPageChange: (page: number) => void
) => {
  return visiblePages.map((page, index) => {
    if (page === -1) {
      return (
        <li key={`dots-${index}`} className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
    }

    return (
      <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
        <button className="page-link" onClick={() => onPageChange(page)}>
          {page}
        </button>
      </li>
    );
  });
};