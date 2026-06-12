// BookTable.tsx
import React from 'react';

// Định nghĩa interface cho Book
interface Book {
  id: string;
  name: string;
  author: string;
  price: number;
  pages: number;
  bookStatus: 'PUBLISHED' | 'DRAFT';
  imgUrl: string;
}

interface BookTableProps {
  books: Book[];
  selectedBooks: string[];
  onSelectBook: (bookId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onEditBook: (book: Book) => void;
  onDeleteBook: (bookId: string) => void;
}

const BookTable: React.FC<BookTableProps> = ({
  books,
  selectedBooks,
  onSelectBook,
  onSelectAll,
  onEditBook,
  onDeleteBook,
}) => {
  // Kiểm tra xem có phải tất cả đã được chọn không
  const isAllSelected = books.length > 0 && selectedBooks.length === books.length;

  return (
    <div className="card-body pt-0">
      <div className="table-responsive table-card mb-1">
        <table className="table table-nowrap align-middle">
          <thead className="text-muted table-light">
            <tr className="text-uppercase">
              <th scope="col" style={{ width: "20px" }}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={(e) => onSelectAll(e.target.checked)}
                    
                  />
                </div>
              </th>
              <th style={{ width: 50 }}>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Price ($)</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="list form-check-all">
            {books.map((book) => (
              <tr key={book.id}>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input book-checkbox"
                      type="checkbox"
                      checked={selectedBooks.includes(book.id)}
                      onChange={(e) => onSelectBook(book.id, e.target.checked)}
                    />
                  </div>
                </td>
                <td>
                  <div className="avatar-md" style={{ width: 100 }}>
                    <img
                      src={book.imgUrl}
                      alt={book.name}
                      className="rounded avatar-book"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </td>
                <td>
                  <h6
                    className="fs-14 mb-0"
                    style={{
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontSize: "16px",
                    }}
                  >
                    {book.name}
                  </h6>
                </td>
                <td>{book.author}</td>
                <td>${book.price?.toFixed(2)}</td>
                <td>{book.pages}</td>
                <td>
                  <span
                    className={`badge ${book.bookStatus === "PUBLISHED"
                        ? "bg-success-subtle text-success"
                        : "bg-secondary-subtle text-secondary"
                      }`}
                  >
                    {book.bookStatus === "PUBLISHED" ? "Published" : "Draft"}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-1">
                    <button
                      className="btn btn-sm btn-outline-success edit-book-btn"
                      onClick={() => onEditBook(book)}
                      title="Edit"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger delete-book-btn"
                      onClick={() => onDeleteBook(book.id)}
                      title="Delete"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row align-items-center">
        <div className="col-sm">
          <div className="text-muted">
            Showing 1 to {books.length} of {books.length} entries
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTable;