import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RichTextEditor from "../../common/RichTextEditor";
import { useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import {
  CourseService,
  type CoursePostAndPut,
} from "../../../../services/CourseListService";
import { type categoryGet } from "../../../../services/CourseCategoryService";
import { toast } from "react-toastify";

interface addProps {
  show: boolean;
  close: () => void;
  reload: () => void;
  categories: categoryGet[];
}

const AddCourse = ({ show, close, reload, categories }: addProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  // React Hook Form
  const { handleSubmit, reset, control } = useForm<CoursePostAndPut>({
    defaultValues: {
      courseCategoryId: 0, // số 0 thay vì undefined
      title: "",
      author: "", // bạn thiếu author trong defaultValues
      description: "",
      imgUrl: null, // null được chấp nhận
      originalPrice: 0,
      discountPercent: 0,
      level: "",
      active: true,
    },
  });
  const onSubmit: SubmitHandler<CoursePostAndPut> = async (
    formData: CoursePostAndPut,
  ) => {
    toast
      .promise(CourseService.create(formData), {
        pending: "Adding new Course...",
        success: "Add Successfully!",
        error: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          render({ data }: { data: any }) {
            const err = data;
            if (err.response?.status === 400 && err.response?.data?.errors) {
              const messages = Object.values(err.response.data.errors).join(
                ", ",
              );
              return `Validation failed: ${messages}`;
            }
            return err.response?.data?.error || "Add fail";
          },
        },
      })
      .then(() => {
        reload();
        close();
      })
      .catch((err) => console.error(err));
  };

  const handleClose = () => {
    reset();
    setPreview(null);
    close();
  };
  return (
    <>
      <>
        {/* Add Course Modal */}

        <Modal
          size="xl"
          centered
          onHide={handleClose}
          show={show}
          animation={true}
          id="addCourseModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          {/* <div className="modal-content"> */}
          <Modal.Header className=" bg-light p-3">
            <Modal.Title className="modal-title" id="exampleModalLabel">
              Add Course
            </Modal.Title>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              id="close-modal"
              onClick={handleClose}
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
                <label htmlFor="Course-image-field" className="form-label">
                  Course Image
                </label>
                <Controller
                  name="imgUrl"
                  control={control}
                  render={({ field: { onChange, onBlur, name, ref } }) => (
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      id="Course-image-field"
                      onBlur={onBlur}
                      name={name}
                      ref={ref}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        onChange(file); // gửi file lên react-hook-form
                        setPreview(file ? URL.createObjectURL(file) : null);
                      }}
                    />
                  )}
                />
                {preview && (
                  <img src={preview} alt="preview" width="100" height="100" />
                )}
                {/* <input
                    type="file"
                    id="Course-image-field"
                    className="form-control"
                    accept="image/*"
                  /> */}
                <div className="mt-2" id="Course-image-preview" />
              </div>
              <div className="mb-3">
                <label htmlFor="Course-title-field" className="form-label">
                  Course Title
                </label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      id="Course-title-field"
                      className="form-control"
                      placeholder="Enter title"
                      required
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Course-category-field" className="form-label">
                  Category
                </label>
                <Controller
                  name="courseCategoryId"
                  control={control}
                  render={({ field }) => (
                    <select
                      className="form-select"
                      id="Course-category-field"
                      required
                      {...field}
                    >
                      <option value="">Select Category</option>
                      {categories &&
                        categories.map((cat) => {
                          if (cat.active) {
                            return (
                              <option value={cat.id} key={cat.id}>
                                {cat.name}
                              </option>
                            );
                          }
                        })}
                    </select>
                  )}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Course-author-field" className="form-label">
                  Author
                </label>
                <Controller
                  name="author"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      id="Course-author-field"
                      className="form-control"
                      placeholder="Enter author"
                      required
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Course-level-field" className="form-label">
                  Level
                </label>
                <Controller
                  name="level"
                  control={control}
                  render={({ field }) => (
                    <select
                      className="form-select"
                      id="Course-level-field"
                      required
                      {...field}
                    >
                      <option value="beginner">beginner</option>
                      <option value="intermediate">intermediate</option>
                      <option value="advanced">advanced</option>
                      
                    </select>
                  )}
                />
              </div>
                  
              <div className="row gy-4 mb-3">
                <div className="col-md-6">
                  <div>
                    <label htmlFor="Course-price-field" className="form-label">
                      Price
                    </label>
                    <Controller
                      name="originalPrice"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="number"
                          id="Course-price-field"
                          className="form-control"
                          placeholder="Price"
                          required
                          {...field}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <label htmlFor="Course-discount-field" className="form-label">
                      Discount
                    </label>
                    <Controller
                      name="discountPercent"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="number"
                          id="Course-discount-field"
                          className="form-control"
                          placeholder="discount (%)"
                          {...field}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="Course-content-field" className="form-label">
                  Content
                </label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Descrition"
                    />
                  )}
                />
              </div>
              {/* <div className="mb-3">
                  <label htmlFor="Course-tags-field" className="form-label">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    id="Course-tags-field"
                    className="form-control"
                    placeholder="design, ux, ui"
                  />
                </div> */}
              <div>
                <label htmlFor="Course-status-field" className="form-label">
                  Status
                </label>
                <Controller
                  name="active"
                  control={control}
                  render={({ field }) => (
                    <select
                      className="form-select"
                      data-trigger=""
                      required={true}
                      id="Course-status-field"
                      value={field.value ? "Published" : "Draft"}
                      onChange={(e) =>
                        field.onChange(e.target.value === "Published")
                      }
                    >
                      <option value="">Status</option>
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                  )}
                />
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
                <button type="submit" className="btn btn-success" id="add-btn">
                  Add Course
                </button>
              </div>
            </Modal.Footer>
          </form>
          {/* </div> */}
        </Modal>
      </>
    </>
  );
};
export default AddCourse;
