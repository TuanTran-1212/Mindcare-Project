import { Modal } from "react-bootstrap";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  CourseService,
  type CourseGet,
  type CoursePostAndPut,
} from "../../../../services/CourseListService";
import { type categoryGet } from "../../../../services/CourseCategoryService";
import { toast } from "react-toastify";
import RichTextEditor from "../../common/RichTextEditor";
import { useEffect, useState } from "react";

interface UpdateCourseProps {
  show: boolean;
  onHide: () => void; // đổi tên từ close -> onHide để giống UpdateCourseCategory
  reload: () => void;
  categories: categoryGet[];
  Course: CourseGet | null; // chỉ dùng cho update
}

const UpdateCourse = ({
  show,
  onHide,
  reload,
  categories,
  Course,
}: UpdateCourseProps) => {
  console.log("ccae:", Course?.courseCategoryId);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  const { register, handleSubmit, reset, setValue } = useForm<CoursePostAndPut>(
    {
      defaultValues: {
        courseCategoryId: 0,
        title: "",
        author: "",
        description: "",
        imgUrl: null,
        originalPrice: 0,
        discountPercent: 0,
        level: "",
        active: true,
      },
    },
  );

  // Đồng bộ form khi có Course (mở modal edit)
  useEffect(() => {
    if (Course) {
      reset({
        courseCategoryId: Course.courseCategoryId,
        title: Course.title,
        author: Course.author,
        description: Course.description,
        imgUrl: null,
        originalPrice: Course.originalPrice,
        discountPercent: Course.discountPercent,
        level: Course.level,
        active: Course.active,
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDescription(Course.description || "");
      const baseUrl = "http://localhost:8080";
      setPreview(Course.imgUrl ? baseUrl + Course.imgUrl : null);
      setFile(null);
    } else {
      reset();
      setDescription("");
      setPreview(null);
      setFile(null);
    }
  }, [Course, reset]);

  // Đồng bộ description với react‑hook‑form
  useEffect(() => {
    setValue("description", description);
  }, [description, setValue]);

  const onSubmit: SubmitHandler<CoursePostAndPut> = async (formData) => {
    if (!Course) return;
    // Gắn file nếu có
    formData.imgUrl = file;
    formData.description = description;

    toast
      .promise(CourseService.update(Course.id, formData), {
        pending: "Updating Course...",
        success: "Update Successfully!",
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
        onHide();
      })
      .catch((err) => console.error(err));
  };

  const handleClose = () => {
    reset();
    setPreview(null);
    setFile(null);
    setDescription("");
    onHide();
  };
  const selectStyle = {
    padding: "12px 30px 12px 13px",
    // các thuộc tính CSS khác nếu cần
  };
  return (
    <>
      <Modal
        show={show}
        animation={true}
        onHide={handleClose}
        centered
        size="xl"
        id="editCourseModal"
        tabIndex={-1}
        aria-labelledby="editCourseModalLabel"
      >
        <Modal.Header className="bg-light p-3">
          <Modal.Title id="editCourseModalLabel">Edit Course</Modal.Title>
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
            {/* File input + preview */}
            <div className="mb-3">
              <label htmlFor="Course-image-field" className="form-label">
                Course Image
              </label>
              <input
                type="file"
                style={selectStyle}
                accept="image/*"
                className="form-control"
                id="Course-image-field"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    setFile(f);
                    if (preview?.startsWith("blob:"))
                      URL.revokeObjectURL(preview);
                    setPreview(URL.createObjectURL(f));
                  } else {
                    setFile(null);
                    if (Course?.imgUrl)
                      setPreview("http://localhost:8080" + Course.imgUrl);
                    else setPreview(null);
                  }
                }}
              />
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  width="100"
                  height="100"
                  className="mt-2"
                />
              )}
            </div>

            {/* Title */}
            <div className="mb-3">
              <label htmlFor="Course-title-field" className="form-label">
                Course Title
              </label>
              <input
                type="text"
                style={selectStyle}
                id="Course-title-field"
                className="form-control"
                placeholder="Enter title"
                {...register("title")}
                required
              />
            </div>

            {/* Category select */}
            <div className="mb-3">
              <label htmlFor="Course-category-field" className="form-label">
                Category
              </label>
              <select
                className="form-select"
                style={selectStyle}
                id="Course-category-field"
                {...register("courseCategoryId", { valueAsNumber: true })}
                required
              >
                {categories.map((cat) =>
                  cat.active ? (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ) : (
                    ""
                  ),
                )}
              </select>
            </div>
            <div className="row gy-4 mb-3">
              {/* Author */}
              <div className="col-md-6">
                <label htmlFor="Course-author-field" className="form-label">
                  Author
                </label>
                <input
                  type="text"
                  style={selectStyle}
                  id="Course-author-field"
                  className="form-control"
                  placeholder="Enter author"
                  {...register("author")}
                  required
                />
              </div>
              {/* Status select */}
              <div className="col-md-6">
                <label htmlFor="Course-status-field" className="form-label">
                  Status
                </label>
                <select
                  className="form-select"
                  style={selectStyle}
                  id="Course-status-field"
                  {...(register("active"),
                  { value: Course?.active ? "Published" : "Draft" })}
                  onChange={(e) =>
                    setValue("active", e.target.value === "Published")
                  }
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="Course-level-field" className="form-label">
                Level
              </label>

              <select
                className="form-select"
                style={selectStyle}
                id="Course-level-field"
                required
                {...register("level")}
              >
                <option value="beginner">beginner</option>
                <option value="intermediate">intermediate</option>
                <option value="advanced">advanced</option>
              </select>
            </div>

            <div className="row gy-4 mb-3">
              <div className="col-md-6">
                <label htmlFor="Course-price-field" className="form-label">
                  Price ($)
                </label>
                <input
                  type="number"
                  style={selectStyle}
                  id="Course-price-field"
                  className="form-control"
                  placeholder="Price"
                  {...register("originalPrice")}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="Course-discount-field" className="form-label">
                  Discount (%)
                </label>
                <input
                  type="number"
                  style={selectStyle}
                  id="Course-discount-field"
                  className="form-control"
                  placeholder="discount (%)"
                  {...register("discountPercent", { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* RichTextEditor */}
            <div className="mb-3">
              <label htmlFor="Course-content-field" className="form-label">
                Content
              </label>
              <RichTextEditor
                value={description}
                onChange={setDescription}
                placeholder="Description"
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
              <button type="submit" className="btn btn-success">
                Update Course
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default UpdateCourse;
