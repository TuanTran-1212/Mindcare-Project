import { useState, useMemo } from 'react';
import type { Book } from '../../../data/Types';

interface FilterState {
  search: string;
  status: string;
}
export const useBookTable = (initialBooks: Book[] = []) => {
  const [books, setBooks] = useState<Book[]>(initialBooks || []);
  const [filters, setFilters] = useState<FilterState>({ search: '', status: 'all' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const itemsPerPage = 10;

  // 1. Logic Lọc (Filter)
  const filteredBooks = useMemo(() => {
    if (!books) return [];
    return books.filter(book => {
      const matchStatus = filters.status === 'all' || book.status.toLowerCase() === filters.status.toLowerCase();
      const matchSearch = book.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                          book.author.toLowerCase().includes(filters.search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [books, filters]);

  // 2. Logic Phân trang (Pagination)
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + itemsPerPage);

  // 3. Xử lý xóa
  const deleteBooks = (ids: number[]) => {
    if (window.confirm(`Are you sure you want to delete ${ids.length} book(s)?`)) {
      setBooks(prev => prev.filter(book => !ids.includes(book.id)));
      setSelectedIds([]);
      alert("Deleted successfully!");
    }
  };

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedBooks.map(b => b.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelectOne = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return {
    filters, setFilters,
    currentPage, setCurrentPage,
    paginatedBooks,
    totalPages,
    totalCount: filteredBooks.length,
    startIndex,
    selectedIds,
    deleteBooks,
    toggleSelectAll,
    toggleSelectOne
  };
};