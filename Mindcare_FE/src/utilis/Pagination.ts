// src/utils/pagination.ts
/**
 * Tính toán tổng số trang dựa trên tổng items và số items mỗi trang
 */
export const calculateTotalPages = (totalItems: number, itemsPerPage: number): number => {
  return Math.ceil(totalItems / itemsPerPage);
};

/**
 * Lấy danh sách items cho trang hiện tại
 */
export const getPaginatedItems = <T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number
): T[] => {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return items.slice(start, end);
};