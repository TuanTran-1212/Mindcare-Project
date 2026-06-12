import { Modal } from "react-bootstrap";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  CourseCategoryService,
  type categoryPostAndPut,
} from "../../../../services/CourseCategoryService";
import { toast } from "react-toastify";
interface addProps {
  show: boolean; // Thay thế data-bs-toggle
  onHide: () => void; // Thay thế data-bs-dismiss
  reload: () => void;
}
interface dataPostProps {
  name: string;
  status: string;
}

const AddCourseCategory = ({ show, onHide, reload }: addProps) => {
  // state cho form data

  // React Hook Form
  const { register, handleSubmit, reset } = useForm<dataPostProps>({
    defaultValues: { name: "", status: "active" },
  });

  const onSubmit: SubmitHandler<dataPostProps> = async (
    formData: dataPostProps,
  ) => {
    const postData: categoryPostAndPut = {
      name: formData.name,
      active: formData.status === "active",
    };
    toast
      .promise(CourseCategoryService.create(postData), {
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

  //handle close modal
  const handleClose = () => {
    reset();
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
            onSubmit={handleSubmit(onSubmit)}
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
                  {...register("name")}
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
                  className="form-select"
                  data-trigger=""
                  required
                  id="category-status-field"
                  {...register("status")}
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

export default AddCourseCategory;
