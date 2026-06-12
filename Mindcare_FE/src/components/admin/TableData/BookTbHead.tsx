// BookCollectionHeader.jsx
interface BookCollectionHeaderProps {
  onAddClick: () => void; // function xử lý thêm sách
  onDeleteClick: () => void; // function xử lý xóa
  selectedCount: number; // số lượng item được chọn để xóa
}
const BookCollectionHeader = ({
  onAddClick, // function xử lý thêm sách
  onDeleteClick, // function xử lý xóa
  selectedCount = 0, // số lượng item được chọn để xóa
}: BookCollectionHeaderProps) => {
  return (
    <div className="card-header border-0">
      <div className="row align-items-center gy-3">
        <div className="col-sm">
          <h5 className="card-title mb-0">Book Collection</h5>
        </div>
        <div className="col-sm-auto">
          <div className="d-flex gap-1 flex-wrap">
            <button
              type="button"
              className="btn btn-success btn-lg add-btn"
              onClick={onAddClick} // Thay data-bs-toggle bằng function
            >
              <i className="ri-add-line align-bottom me-1"></i> Add Book
            </button>

            {selectedCount > 0 && (
              <button className="btn btn-danger" onClick={onDeleteClick}>
                <i className="fas fa-trash me-1"></i> Delete (
                <span>{selectedCount}</span>)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookCollectionHeader;
