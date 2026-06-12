import { Modal } from "react-bootstrap";
import type {
  createBookCategoryDTO,
  category,
} from "../../../../services/BookCategoryService";
import { useEffect, useState } from "react";

interface updateProps {
  show: boolean; // Thay thế data-bs-toggle
  category: category | null;
  onHide: () => void; // Thay thế data-bs-dismiss
  onSave: (categoryData: createBookCategoryDTO) => void; // Submit handler
}

const UpdatecourseCategory = ({
  show,
  category,
  onHide,
  onSave,
}: updateProps) => {
  // state cho form data
  const [formData, setFormData] = useState<createBookCategoryDTO>({
    name: category?.name || "",
    status: category?.status || "active",
  });

  useEffect(() => {
    if (category) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: category.name, // ✅ Dùng name
        status: category.status,
      });
    } else {
      // Reset khi không có category
      setFormData({
        name: "",
        status: "active",
      });
    }
  }, [category]);

  //handle input data change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const id = e.target.id;
    const value = e.target.value;

    if (id === "edit-category-name-field") {
      setFormData((formData) => ({ ...formData, name: value }));
    } else if (id === "edit-category-status-field") {
      setFormData((formData) => ({
        ...formData,
        status: value as "active" | "inactive",
      }));
    }
  };

  //handle submit form
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    //valiadate
    if (!formData.name.trim()) {
      return;
    }

    onSave(formData);

    //reset form
    setFormData({ name: "", status: "active" });
  };

  //handle close modal
  const handleClose = () => {
    setFormData({ name: "", status: "active" });
    onHide();
  };

  return (
    <>
      {show && (
        // Edit Category Modal
        <Modal
          show={show}
          animation={true}
          onHide={handleClose}
          centered
          id="editCategoryModal"
          tabIndex={-1}
          aria-labelledby="editCategoryModalLabel"
        >
          {/* <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content"> */}
          <Modal.Header className="bg-light p-3">
            <Modal.Title id="editCategoryModalLabel">Edit Category</Modal.Title>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            />
          </Modal.Header>
          <form
            className="tablelist-form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Modal.Body>
              <input type="hidden" id="edit-category-id" />
              <div className="mb-3">
                <label
                  htmlFor="edit-category-name-field"
                  className="form-label"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="edit-category-name-field"
                  className="form-control"
                  placeholder="Enter category name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* <div className="mb-3">
                    <label
                      htmlFor="edit-category-description-field"
                      className="form-label"
                    >
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="edit-category-description-field"
                      rows={3}
                      placeholder="Enter category description"
                      defaultValue={""}
                    />
                  </div> */}
              <div>
                <label
                  htmlFor="edit-category-status-field"
                  className="form-label"
                >
                  Status
                </label>
                <select
                  className="form-control"
                  data-trigger=""
                  name="edit-category-status-field"
                  required
                  id="edit-category-status-field"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="hstack gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  id="update-category-btn"
                >
                  Update Category
                </button>
              </div>
            </Modal.Footer>
          </form>
          {/* </div>
          </div> */}
        </Modal>
      )}
    </>
  );
};

export default UpdatecourseCategory;
