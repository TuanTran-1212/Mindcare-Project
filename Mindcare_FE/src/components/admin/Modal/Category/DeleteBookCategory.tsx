import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  type categoryGet,
  BookCategoryService,
} from "../../../../services/BookCategoryService";

interface deleteProps {
  show: boolean; // Thay thế data-bs-toggle
  category: categoryGet | null;
  onHide: () => void; // Thay thế data-bs-dismiss
  reload: () => void;
}

const DeleteBookCategory = ({
  show,
  category,
  onHide,
  reload,
}: deleteProps) => {
  //TODO: handle delete hard
  const handleDelete = async () => {
    if (!category) return;

    toast
      .promise(BookCategoryService.delete(category.id), {
        pending: "Deleting category...",
        success: "Delete Successfully!",
        error: "Delete fail",
      })
      .then(() => {
        reload();
        onHide();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <>
        {/* Delete Book Modal */}
        <Modal
          show={show}
          animation={true}
          onHide={onHide}
          className="flip"
          id="deleteBookModal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className=" modal-dialog-centered">
            <Modal.Body className=" p-5 text-center">
              <i className="fas fa-trash-alt fs-1 text-danger mb-4" />
              <div className="mt-4 text-center">
                <h4>You are about to delete a book?</h4>
                <p className="text-muted fs-15 mb-4">
                  Deleting your book will remove all of your information from
                  our database.
                </p>
                <div className="hstack gap-2 justify-content-center remove">
                  <button
                    className="btn btn-link link-success fw-medium text-decoration-none"
                    id="deleteBook-close"
                    onClick={onHide}
                  >
                    <i className="ri-close-line me-1 align-middle" /> Close
                  </button>
                  <button
                    className="btn btn-danger"
                    id="deleteBook-record"
                    onClick={handleDelete}
                  >
                    Yes, Delete It
                  </button>
                </div>
              </div>
            </Modal.Body>
          </div>
        </Modal>
      </>
    </>
  );
};
export default DeleteBookCategory;
