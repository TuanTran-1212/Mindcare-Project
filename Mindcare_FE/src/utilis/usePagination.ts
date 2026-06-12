// src/utilis/usePagination.ts
import { useState, useCallback } from 'react';
import { calculateTotalPages, getPaginatedItems } from './Pagination';

export function usePagination<T>(items: T[], itemsPerPage: number = 3) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = calculateTotalPages(items.length, itemsPerPage);

  const paginatedItems = getPaginatedItems(items, currentPage, itemsPerPage);

  const goToPage = useCallback((page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  return {
    currentPage,                               
    totalPages,
    items: paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
}