import React, { useState } from "react";
import { Modal } from "react-bootstrap";

interface addProps {
  show: boolean; // Thay thế data-bs-toggle
  onHide: () => void; // Thay thế data-bs-dismiss
  onSave: (categoryData: CategoryFormData) => void; // Submit handler
}

interface CategoryFormData {
  name: string;
  status: "active" | "inactive";
}

const AddCategory = ({ show, onHide, onSave }: addProps) => {
  // state cho form data
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    status: "active",
  });

  //handle input data change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const id = e.target.id;
    const value = e.target.value;

    if (id === "category-name-field") {
      setFormData((formData) => ({ ...formData, name: value }));
    } else if (id === "category-status-field") {
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
        <Modal
          show={show}
          animation={true}
          onHide={handleClose}
          centered
          backdrop
          id="addCategoryModal"
          tabIndex={-1}
          aria-labelledby="addCategoryModalLabel"
        >
          {/* <div className="modal-dialog modal-dialog-centered"> */}
          {/* <div className="modal-content"> */}
          <Modal.Header className="bg-light p-3">
            <Modal.Title id="addCategoryModalLabel">Add Category</Modal.Title>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
              id="close-modal"
            />
          </Modal.Header>
          <form
            className="tablelist-form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Modal.Body>
              <input type="hidden" id="id-field" />
              <div className="mb-3">
                <label htmlFor="category-name-field" className="form-label">
                  Category Name
                </label>
                {/* Input name cate */}
                <input
                  type="text"
                  id="category-name-field"
                  className="form-control"
                  placeholder="Enter category name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* <div className="mb-3">
              <label
                htmlFor="category-description-field"
                className="form-label"
              >
                Description
              </label>
              <textarea
                className="form-control"
                id="category-description-field"
                rows={3}
                placeholder="Enter category description"
                defaultValue={""}
              />
            </div> */}
              <div>
                <label htmlFor="category-status-field" className="form-label">
                  Status
                </label>
                <select
                  className="form-control"
                  data-trigger=""
                  name="category-status-field"
                  required
                  id="category-status-field"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="active" selected>
                    Active
                  </option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="hstack gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  id="add-category-btn"
                >
                  Add Category
                </button>
              </div>
            </Modal.Footer>
          </form>
          {/* </div> */}
          {/* </div> */}
        </Modal>
      )}
    </>
  );
};

export default AddCategory;
