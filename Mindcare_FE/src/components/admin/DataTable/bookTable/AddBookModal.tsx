import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RichTextEditor from "../../common/RichTextEditor";
import { useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import {
  BookService,
  type BookPostAndPut,
} from "../../../../services/BookListService";
import { type categoryGet } from "../../../../services/BookCategoryService";
import { toast } from "react-toastify";

interface addProps {
  show: boolean;
  close: () => void;
  reload: () => void;
  categories: categoryGet[];
}

const AddBook = ({ show, close, reload, categories }: addProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  // React Hook Form
  const { handleSubmit, reset, control } = useForm<BookPostAndPut>({
    defaultValues: {
      bookCategoryId: 0, // số 0 thay vì undefined
      title: "",
      author: "", // bạn thiếu author trong defaultValues
      publisher: "",
      publishedYear: 0,
      description: "",
      imgUrl: null, // null được chấp nhận
      stock: 0, // hoặc "0"
      originalPrice: 0,
      discountPercent: 0,
      pages: 0,
      active: true,
    },
  });
  const onSubmit: SubmitHandler<BookPostAndPut> = async (
    formData: BookPostAndPut,
  ) => {
    toast
      .promise(BookService.create(formData), {
        pending: "Adding new Book...",
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
        {/* Add Book Modal */}

        <Modal
          size="xl"
          centered
          onHide={handleClose}
          show={show}
          animation={true}
          id="addBookModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          {/* <div className="modal-content"> */}
          <Modal.Header className=" bg-light p-3">
            <Modal.Title className="modal-title" id="exampleModalLabel">
              Add Book
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
                <label htmlFor="book-image-field" className="form-label">
                  Book Image
                </label>
                <Controller
                  name="imgUrl"
                  control={control}
                  render={({ field: { onChange, onBlur, name, ref } }) => (
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      id="book-image-field"
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
                    id="book-image-field"
                    className="form-control"
                    accept="image/*"
                  /> */}
                <div className="mt-2" id="book-image-preview" />
              </div>
              <div className="mb-3">
                <label htmlFor="book-title-field" className="form-label">
                  Book Title
                </label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      id="book-title-field"
                      className="form-control"
                      placeholder="Enter title"
                      required
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="book-category-field" className="form-label">
                  Category
                </label>
                <Controller
                  name="bookCategoryId"
                  control={control}
                  render={({ field }) => (
                    <select
                      className="form-select"
                      id="book-category-field"
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
                <label htmlFor="book-author-field" className="form-label">
                  Author
                </label>
                <Controller
                  name="author"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      id="book-author-field"
                      className="form-control"
                      placeholder="Enter author"
                      required
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="row gy-4 mb-3">
                <div className="col-md-6">
                  <label htmlFor="book-publisher-field" className="form-label">
                    Publisher
                  </label>
                  <Controller
                    name="publisher"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        id="book-publisher-field"
                        className="form-control"
                        placeholder="Enter publisher"
                        required
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="book-publishedYear-field"
                    className="form-label"
                  >
                    Published Year
                  </label>
                  <Controller
                    name="publishedYear"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="number"
                        id="book-publishedYear-field"
                        className="form-control"
                        placeholder="Enter published Year"
                        required
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="row gy-4 mb-3">
                <div className="col-md-6">
                  <div>
                    <label htmlFor="book-pages-field" className="form-label">
                      Pages
                    </label>
                    <Controller
                      name="pages"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="number"
                          id="book-pages-field"
                          className="form-control"
                          placeholder="How may pages"
                          required
                          {...field}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <label htmlFor="book-stock-field" className="form-label">
                      Stock
                    </label>
                    <Controller
                      name="stock"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="number"
                          id="book-stock-field"
                          className="form-control"
                          placeholder="Stock"
                          required
                          {...field}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="row gy-4 mb-3">
                <div className="col-md-6">
                  <div>
                    <label htmlFor="book-price-field" className="form-label">
                      Price
                    </label>
                    <Controller
                      name="originalPrice"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="number"
                          id="book-price-field"
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
                    <label htmlFor="book-discount-field" className="form-label">
                      Discount
                    </label>
                    <Controller
                      name="discountPercent"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="number"
                          id="book-discount-field"
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
                <label htmlFor="book-content-field" className="form-label">
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
                  <label htmlFor="book-tags-field" className="form-label">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    id="book-tags-field"
                    className="form-control"
                    placeholder="design, ux, ui"
                  />
                </div> */}
              <div>
                <label htmlFor="book-status-field" className="form-label">
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
                      id="book-status-field"
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
                  Add Book
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
export default AddBook;
