// BookFilter.tsx

// Định nghĩa interface cho props
interface BookFilterProps {
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onReset: () => void;
  // Optional: custom placeholder hoặc options
  searchPlaceholder?: string;
  statusOptions?: { value: string; label: string }[];
}

// Default options cho status
const defaultStatusOptions = [
  { value: "all", label: "All Status" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
];

const BookFilter = ({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onReset,
   
  statusOptions = defaultStatusOptions,
}: BookFilterProps) => {
  return (
    <div className="card-body border border-dashed border-end-0 border-start-0">
      <div className="row g-3">
        {/* Search Box */}
        <div className="col-xl-5 col-sm-6">
          <div className="search-box">
            
            <input
            id="bookSearch"
              type="text"
              className="form-control search"
              placeholder="Search for books, author or something..."
              value={searchTerm || ""} // ✅ Thêm fallback value
              style={{ padding: "12px 16px" }}
              onChange={(e) => onSearchChange(e.target.value)} // ✅ Đảm bảo gọi đúng
            />
            <i className="ri-search-line search-icon"></i>
          </div>
        </div>

        {/* Status Filter */}
        <div className="col-xl-2 col-sm-6">
          <select
            className="form-select w-auto"
            style={{ padding: "12px 30px 12px 13px" }}
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Button */}
        <div className="col-xl-2 col-sm-6">
          <button
            type="button"
            className="btn btn-outline-primary w-100 h-100"
            onClick={onReset}
          >
            <i className="fas fa-refresh me-1"></i>
            Reset Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookFilter;
