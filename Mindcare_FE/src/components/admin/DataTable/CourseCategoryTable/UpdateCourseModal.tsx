import { Modal } from "react-bootstrap";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  type categoryPostAndPut,
  type categoryGet,
  CourseCategoryService,
} from "../../../../services/CourseCategoryService";
import { toast } from "react-toastify";

interface updateProps {
  show: boolean; // Thay thế data-bs-toggle
  category: categoryGet | null;
  onHide: () => void; // Thay thế data-bs-dismiss
  reload: () => void;
}
interface dataPutProps {
  name: string;
  status: string;
}

const UpdateCourseCategory = ({
  show,
  category,
  onHide,
  reload,
}: updateProps) => {
  // state cho form data
  const { register, handleSubmit, reset } = useForm<dataPutProps>({
    defaultValues: {
      name: category?.name,
      status: category?.active ? "active" : "inactive",
    },
  });

  const onSubmit: SubmitHandler<dataPutProps> = async (
    formData: dataPutProps,
  ) => {
    if (!category) return;

    const putData: categoryPostAndPut = {
      name: formData.name,
      active: formData.status === "active",
    };

    toast
      .promise(CourseCategoryService.update(category.id, putData), {
        pending: "Updating category...",
        success: "Update Successfully!",
        error: "Update fail",
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
            onSubmit={handleSubmit(onSubmit)}
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
                  {...register("name")}
                  
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
                  required
                  id="edit-category-status-field"
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

export default UpdateCourseCategory;
