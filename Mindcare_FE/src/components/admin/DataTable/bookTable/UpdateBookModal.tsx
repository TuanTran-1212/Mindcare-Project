import { Modal } from "react-bootstrap";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  BookService,
  type BookGet,
  type BookPostAndPut,
} from "../../../../services/BookListService";
import { type categoryGet } from "../../../../services/BookCategoryService";
import { toast } from "react-toastify";
import RichTextEditor from "../../common/RichTextEditor";
import { useEffect, useState } from "react";

interface UpdateBookProps {
  show: boolean;
  onHide: () => void; // đổi tên từ close -> onHide để giống UpdateBookCategory
  reload: () => void;
  categories: categoryGet[];
  book: BookGet | null; // chỉ dùng cho update
}

const UpdateBook = ({
  show,
  onHide,
  reload,
  categories,
  book,
}: UpdateBookProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  const { register, handleSubmit, reset, setValue } = useForm<BookPostAndPut>({
    defaultValues: {
      bookCategoryId: 0,
      title: "",
      author: "",
      publisher: "",
      publishedYear: 0,
      description: "",
      imgUrl: null,
      stock: 0,
      originalPrice: 0,
      discountPercent: 0,
      pages: 0,
      active: true,
    },
  });

  // Đồng bộ form khi có book (mở modal edit)
  useEffect(() => {
    if (book) {
      reset({
        bookCategoryId: book.bookCategoryId,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        publishedYear: book.publishedYear,
        description: book.description,
        imgUrl: null,
        stock: book.stock,
        originalPrice: book.originalPrice,
        discountPercent: book.discountPercent,
        pages: book.pages,
        active: book.active,
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDescription(book.description || "");
      const baseUrl = "http://localhost:8080";
      setPreview(book.imgUrl ? baseUrl + book.imgUrl : null);
      setFile(null);
    } else {
      reset();
      setDescription("");
      setPreview(null);
      setFile(null);
    }
  }, [book, reset]);

  // Đồng bộ description với react‑hook‑form
  useEffect(() => {
    setValue("description", description);
  }, [description, setValue]);

  const onSubmit: SubmitHandler<BookPostAndPut> = async (formData) => {
    if (!book) return;
    // Gắn file nếu có
    formData.imgUrl = file;
    formData.description = description;

    toast
      .promise(BookService.update(book.id, formData), {
        pending: "Updating book...",
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

  return (
    <>
      <Modal
        show={show}
        animation={true}
        onHide={handleClose}
        centered
        size="xl"
        id="editBookModal"
        tabIndex={-1}
        aria-labelledby="editBookModalLabel"
      >
        <Modal.Header className="bg-light p-3">
          <Modal.Title id="editBookModalLabel">Edit Book</Modal.Title>
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
              <label htmlFor="book-image-field" className="form-label">
                Book Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                id="book-image-field"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    setFile(f);
                    if (preview?.startsWith("blob:"))
                      URL.revokeObjectURL(preview);
                    setPreview(URL.createObjectURL(f));
                  } else {
                    setFile(null);
                    if (book?.imgUrl)
                      setPreview("http://localhost:8080" + book.imgUrl);
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
              <label htmlFor="book-title-field" className="form-label">
                Book Title
              </label>
              <input
                type="text"
                id="book-title-field"
                className="form-control"
                placeholder="Enter title"
                {...register("title")}
                required
              />
            </div>

            {/* Category select */}
            <div className="mb-3">
              <label htmlFor="book-category-field" className="form-label">
                Category
              </label>
              <select
                className="form-select"
                id="book-category-field"
                {...register("bookCategoryId", { valueAsNumber: true })}
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

            {/* Author */}
            <div className="mb-3">
              <label htmlFor="book-author-field" className="form-label">
                Author
              </label>
              <input
                type="text"
                id="book-author-field"
                className="form-control"
                placeholder="Enter author"
                {...register("author")}
                required
              />
            </div>

            <div className="row gy-4 mb-3">
              <div className="col-md-6">
                <label htmlFor="book-publisher-field" className="form-label">
                  Publisher
                </label>
                <input
                  type="text"
                  id="book-publisher-field"
                  className="form-control"
                  placeholder="Enter publisher"
                  {...register("publisher")}
                  required
                />
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="book-publishedYear-field"
                  className="form-label"
                >
                  Published Year
                </label>
                <input
                  type="number"
                  id="book-publishedYear-field"
                  className="form-control"
                  placeholder="Enter published Year"
                  {...register("publishedYear", { valueAsNumber: true })}
                  required
                />
              </div>
            </div>

            <div className="row gy-4 mb-3">
              <div className="col-md-6">
                <label htmlFor="book-pages-field" className="form-label">
                  Pages
                </label>
                <input
                  type="number"
                  id="book-pages-field"
                  className="form-control"
                  placeholder="How many pages"
                  {...register("pages", { valueAsNumber: true })}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="book-stock-field" className="form-label">
                  Stock
                </label>
                <input
                  type="number"
                  id="book-stock-field"
                  className="form-control"
                  placeholder="Stock"
                  {...register("stock", { valueAsNumber: true })}
                  required
                />
              </div>
            </div>

            <div className="row gy-4 mb-3">
              <div className="col-md-6">
                <label htmlFor="book-price-field" className="form-label">
                  Price ($)
                </label>
                <input
                  type="number"
                  id="book-price-field"
                  className="form-control"
                  placeholder="Price"
                  {...register("originalPrice")}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="book-discount-field" className="form-label">
                  Discount (%)
                </label>
                <input
                  type="number"
                  id="book-discount-field"
                  className="form-control"
                  placeholder="discount (%)"
                  {...register("discountPercent", { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* RichTextEditor */}
            <div className="mb-3">
              <label htmlFor="book-content-field" className="form-label">
                Content
              </label>
              <RichTextEditor
                value={description}
                onChange={setDescription}
                placeholder="Description"
              />
            </div>

            {/* Status select */}
            <div className="mb-3">
              <label htmlFor="book-status-field" className="form-label">
                Status
              </label>
              <select
                className="form-select"
                id="book-status-field"
                {...(register("active"),
                { value: book?.active ? "Published" : "Draft" })}
                onChange={(e) =>
                  setValue("active", e.target.value === "Published")
                }
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
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
              <button type="submit" className="btn btn-success">
                Update Book
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default UpdateBook;
