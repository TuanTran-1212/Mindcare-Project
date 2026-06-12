import { useEffect, useMemo, useState } from "react";
import {
  BookService,
  type BookGet,
  //type BookPostAndPut,
} from "../../../../services/BookListService";
import { useForm, type SubmitHandler } from "react-hook-form";
import Pagination from "../../common/Pagnition";
import AddAndUpdateBook from "./AddBookModal";
import {
  BookCategoryService,
  type categoryGet,
} from "../../../../services/BookCategoryService";
import UpdateBook from "./UpdateBookModal";
import DeleteBook from "./DeleteModal";

interface SearchForm {
  keyword: string;
  filterStatus: string;
}
const baseUrl = "http://localhost:8080";
const BookDatatable = () => {
  //STORED: book list
  const [books, setBooks] = useState<BookGet[]>([]);
  const [categories, setCategories] = useState<categoryGet[]>([]);
  const [book, setBook] = useState<BookGet | null>(null);

  //STORED: check box all state
  const [selectedBook, setSelectedBook] = useState<number[]>([]);

  // filters state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  //STORED: pagition page
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10;

  //STORED: modals toggle
  const [showAddModal, toggleAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [selectedCategory, setSelectedCategory] = useState<BookGet | null>(
  //   null,
  // );
  const [modalKey, setModalKey] = useState(0); // quan ly key cho modal update
  // =============================================== Fetch and Filter data

  //fetch khi componet mount
  // ================== get category to select ======================
  const fetchCategories = async () => {
    try {
      const data = await BookCategoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.log("error getAll message", error);
    }
  };

  const fetchBooks = async () => {
    try {
      const data = await BookService.getAll();
      setBooks(data);
    } catch (error) {
      console.log("error getAll message: ", error);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const handleDelete = async (book: BookGet) => {
    setBook(book);
    setShowDeleteModal(true);
  };
  const handleUpdateModal = (book: BookGet) => {
    setBook(book);
    console.log(book);
    console.log(book);
    setModalKey((prev) => prev + 1);
    setShowUpdateModal(true);
  };

  //LOGIC: create final data
  const finalData = useMemo(() => {
    // cho cac thuoc tinh vaof bien
    let filteredResult = [...books];

    // TODO: filter
    if (filterStatus !== "all") {
      filteredResult = filteredResult.filter((book) => {
        if (filterStatus === "active") {
          return book.active === true;
        }
        return book.active === false;
      });
    }

    if (searchTerm) {
      filteredResult = filteredResult.filter((book) => {
        return book.title
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase());
      });
    }

    //TODO: pagnition
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    const final = filteredResult.slice(start, end);

    return final;
  }, [books, filterStatus, searchTerm, currentPage]);

  //TODO: filter button
  // React Hook Form
  const { register, handleSubmit, reset } = useForm<SearchForm>({
    defaultValues: { keyword: "", filterStatus: "all" },
  });

  const onSubmit: SubmitHandler<SearchForm> = (data: SearchForm) => {
    setSearchTerm(data.keyword);
  };

  const handleFilterByStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleResestFilter = () => {
    reset({ keyword: "", filterStatus: "all" });
    setSearchTerm("");
    setFilterStatus("all");
    setCurrentPage(1);
  };

  //HANDLE: show modals
  const openAddModal = () => {
    toggleAddModal(true);
  };
  const closeAddModal = () => {
    toggleAddModal(false);
  };

  //==========================CHECK BOX==============================

  // Checkbox header - chọn tất cả
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      // Chọn tất cả ID của categories hiện tại
      const allIds = finalData.map((book: BookGet) => book.id);
      setSelectedBook(allIds);
    } else {
      setSelectedBook([]);
    }
  };

  // Checkbox từng dòng
  const handleSelectBook = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedBook((prev) => [...prev, id]);
    } else {
      setSelectedBook((prev) => prev.filter((item) => item !== id));
    }
  };
  //CHECKING:  Kiểm tra tất cả check box  đã được chọn chưa
  const isAllSelected =
    finalData.length > 0 &&
    finalData.every((cat) => selectedBook.includes(cat.id));

  //==========================PAGINITION==================

  //TODO:  reset pagintion page number khi data change
  useEffect(() => {
    setTotalPages(Math.ceil(finalData.length / itemsPerPage));
  }, [finalData]);

  //TODO: handle number pagnition change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //TOCALCULATE: start page, end page, total category in each pagnition
  const startEntry =
    finalData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endEntry = (currentPage - 1) * itemsPerPage + finalData.length;
  const totalEntries = finalData.length; // Tổng sau khi filter

  //NOTE: search field css
  const serchField = {
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "1.05rem",
  };
  console.log(finalData);
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="card" id="bookList">
            {/* HEADER */}
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
                      data-bs-toggle="modal"
                      id="create-btn"
                      onClick={openAddModal}
                    >
                      <i className="ri-add-line align-bottom me-1" /> Add Book
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      id="deleteSelectedBooks"
                      style={{ display: "none" }}
                    >
                      <i className="fas fa-trash me-1" /> Delete (
                      <span id="selectedCount">0</span>)
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Filter Section */}
            <div className="card-body border border-dashed border-end-0 border-start-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row g-3">
                  <div className="col-xl-5 col-sm-6">
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control search"
                        id="bookSearch"
                        placeholder="Search for books, author or something..."
                        {...register("keyword")}
                        style={serchField}
                      />
                      <i className="ri-search-line search-icon" />
                    </div>
                  </div>
                  <div className="col-xl-2 col-sm-6">
                    <div>
                      <select
                        className="form-select w-auto"
                        style={{ padding: "12px 30px 12px 13px" }}
                        aria-label="Default select example"
                        id="bookStatusFilter"
                        {...register("filterStatus")}
                        onChange={handleFilterByStatus}
                      >
                        <option value="all">All</option>
                        <option value="active">Published</option>
                        <option value="inactive">Draft</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-2 col-sm-6">
                    <button
                      type="button"
                      className="btn btn-outline-primary w-100 h-100"
                      id="resetFilter"
                      onClick={handleResestFilter}
                    >
                      <i className="fas fa-refresh me-1" />
                      Reset Filter
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* Table Section */}
            <div className="card-body pt-0">
              <div className="table-responsive table-card mb-1">
                <table
                  className="table table-nowrap align-middle"
                  id="bookTable"
                >
                  <thead className="text-muted table-light">
                    <tr className="text-uppercase">
                      <th scope="col" style={{ width: 20 }}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="checkAll"
                            defaultValue="option"
                            checked={isAllSelected}
                            onChange={handleSelectAll}
                          />
                        </div>
                      </th>
                      <th className="sort" data-sort="image">
                        Image
                      </th>
                      <th className="sort" data-sort="title">
                        Title
                      </th>
                      <th className="sort" data-sort="author">
                        Author
                      </th>
                      <th className="sort" data-sort="price">
                        Price ($)
                      </th>
                      <th className="sort" data-sort="stock">
                        Stock
                      </th>
                      <th className="sort" data-sort="status">
                        Status
                      </th>
                      <th className="sort" data-sort="action">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="list form-check-all" id="bookTableBody">
                    {/* Data rendered by JavaScript */}
                    {finalData.map((book) => {
                      return (
                        <tr key={book.id}>
                          <td>
                            <div className="form-check">
                              <input
                                className="form-check-input book-checkbox"
                                type="checkbox"
                                checked={selectedBook.includes(book.id)}
                                onChange={(e) =>
                                  handleSelectBook(book.id, e.target.checked)
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <div className="avatar-md">
                              <img
                                src={`${baseUrl}${book.imgUrl}`}
                                alt={book.title}
                                className="rounded avatar-book"
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                          </td>
                          <td>
                            <h6
                              className="fs-14 mb-0"
                              style={{
                                maxWidth: 200,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {book.title}
                            </h6>
                          </td>
                          <td>{book.author}</td>
                          <td>{book.finalPrice}</td>
                          <td>{book.stock}</td>
                          <td>
                            <span
                              className={`badge ${book.active ? "bg-success-subtle text-success" : "bg-secondary-subtle text-secondary"}`}
                            >
                              {book.active ? "Published" : "Draft"}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <button
                                className="btn btn-sm btn-outline-success edit-book-btn"
                                data-id={book.id}
                                title="Edit"
                                onClick={() => {
                                  handleUpdateModal(book);
                                }}
                              >
                                <i className="fas fa-edit" />
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger delete-book-btn"
                                data-id="${book.id}"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteBookModal"
                                title="Delete"
                                onClick={() => handleDelete(book)}
                              >
                                <i className="fas fa-trash" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="row align-items-center pagination-wrapper">
                <div className="col-sm">
                  <div className="text-muted" id="showingBooks">
                    Showing {startEntry} to {endEntry} of {totalEntries} entries
                  </div>
                </div>
                <div className="col-sm-auto">
                  <ul className="pagination mb-0" id="paginationBooks">
                    {/* Pagination rendered by JavaScript */}
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddAndUpdateBook
        show={showAddModal}
        close={closeAddModal}
        reload={fetchBooks}
        categories={categories}
      />
      <UpdateBook
        key={modalKey}
        book={book}
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        reload={fetchBooks}
        categories={categories}
      />
      <DeleteBook
        id={book ? book.id : -1}
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        reload={fetchBooks}
      />
    </>
  );
};

export default BookDatatable;
