import { useEffect, useMemo, useState } from "react";
import {
  CourseService,
  type CourseGet,
  //type CoursePostAndPut,
} from "../../../../services/CourseListService";
import { useForm, type SubmitHandler } from "react-hook-form";
import Pagination from "../../common/Pagnition";
import {
  CourseCategoryService,
  type categoryGet,
} from "../../../../services/CourseCategoryService";
import AddCourse from "./AddCourseModal";
import UpdateCourse from "./UpdateCourseModal";
import DeleteCourse from "./DeleteModal";

interface SearchForm {
  keyword: string;
  filterStatus: string;
}
const baseUrl = "http://localhost:8080";
const CourseDatatable = () => {
  //STORED: Course list
  const [Courses, setCourses] = useState<CourseGet[]>([]);
  const [categories, setCategories] = useState<categoryGet[]>([]);
  const [Course, setCourse] = useState<CourseGet | null>(null);

  //STORED: check box all state
  const [selectedCourse, setSelectedCourse] = useState<number[]>([]);

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
//   const [selectedCategory, setSelectedCategory] = useState<CourseGet | null>(
//     null,
//   );
  const [modalKey, setModalKey] = useState(0); // quan ly key cho modal update
  // =============================================== Fetch and Filter data

  //fetch khi componet mount
  // ================== get category to select ======================
  const fetchCategories = async () => {
    try {
      const data = await CourseCategoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.log("error getAll message", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await CourseService.getAll();
      setCourses(data);
    } catch (error) {
      console.log("error getAll message: ", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  const handleDelete = async (Course: CourseGet) => {
    setCourse(Course);
    setShowDeleteModal(true);
  };
  const handleUpdateModal = (Course: CourseGet) => {
    setCourse(Course);
   
    setModalKey((prev) => prev + 1);
    setShowUpdateModal(true);
  };

  //LOGIC: create final data
  const finalData = useMemo(() => {
    // cho cac thuoc tinh vaof bien
    let filteredResult = [...Courses];

    // TODO: filter
    if (filterStatus !== "all") {
      filteredResult = filteredResult.filter((Course) => {
        if (filterStatus === "active") {
          return Course.active === true;
        }
        return Course.active === false;
      });
    }

    if (searchTerm) {
      filteredResult = filteredResult.filter((Course) => {
        return Course.title
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase());
      });
    }

    //TODO: pagnition
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    const final = filteredResult.slice(start, end);

    return final;
  }, [Courses, filterStatus, searchTerm, currentPage]);

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
      const allIds = finalData.map((Course: CourseGet) => Course.id);
      setSelectedCourse(allIds);
    } else {
      setSelectedCourse([]);
    }
  };

  // Checkbox từng dòng
  const handleSelectCourse = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedCourse((prev) => [...prev, id]);
    } else {
      setSelectedCourse((prev) => prev.filter((item) => item !== id));
    }
  };
  //CHECKING:  Kiểm tra tất cả check box  đã được chọn chưa
  const isAllSelected =
    finalData.length > 0 &&
    finalData.every((cat) => selectedCourse.includes(cat.id));

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
  
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="card" id="CourseList">
            {/* HEADER */}
            <div className="card-header border-0">
              <div className="row align-items-center gy-3">
                <div className="col-sm">
                  <h5 className="card-title mb-0">Course Collection</h5>
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
                      <i className="ri-add-line align-bottom me-1" /> Add Course
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      id="deleteSelectedCourses"
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
                        id="CourseSearch"
                        placeholder="Search for Courses, author or something..."
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
                        id="CourseStatusFilter"
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
                  id="CourseTable"
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
                      <th
                        className="sort"
                        style={{ width: "20%" }}
                        data-sort="image"
                      >
                        Image
                      </th>
                      <th
                        className="sort"
                        style={{ width: "20%" }}
                        data-sort="title"
                      >
                        Title
                      </th>

                      <th className="sort" data-sort="author">
                        Instructor
                      </th>
                      <th className="sort" data-sort="price">
                        Price ($)
                      </th>
                      <th className="sort" data-sort="status">
                        Status
                      </th>
                      <th className="sort" data-sort="action">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="list form-check-all" id="CourseTableBody">
                    {/* Data rendered by JavaScript */}
                    {finalData.map((Course) => {
                      return (
                        <tr key={Course.id}>
                          <td>
                            <div className="form-check">
                              <input
                                className="form-check-input Course-checkbox"
                                type="checkbox"
                                checked={selectedCourse.includes(Course.id)}
                                onChange={(e) =>
                                  handleSelectCourse(
                                    Course.id,
                                    e.target.checked,
                                  )
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <div className="avatar-md">
                              <img
                                src={`${baseUrl}${Course.imgUrl}`}
                                alt={Course.title}
                                className="rounded avatar-Course"
                                style={{
                                  objectFit: "cover",
                                  width: "200px",
                                  height: "100px",
                                }}
                              />
                            </div>
                          </td>
                          <td>
                            <h6
                              className="fs-14 mb-0"
                              style={{
                                maxWidth: 300,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {Course.title}
                            </h6>
                          </td>
                          <td>{Course.author}</td>
                          <td>{Course.finalPrice}</td>
                          <td>
                            <span
                              className={`badge ${Course.active ? "bg-success-subtle text-success" : "bg-secondary-subtle text-secondary"}`}
                            >
                              {Course.active ? "Published" : "Draft"}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <button
                                className="btn btn-sm btn-outline-success edit-Course-btn"
                                data-id={Course.id}
                                title="Edit"
                                onClick={() => {
                                  handleUpdateModal(Course);
                                }}
                              >
                                <i className="fas fa-edit" />
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger delete-Course-btn"
                                data-id="${Course.id}"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteCourseModal"
                                title="Delete"
                                onClick={() => handleDelete(Course)}
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
                  <div className="text-muted" id="showingCourses">
                    Showing {startEntry} to {endEntry} of {totalEntries} entries
                  </div>
                </div>
                <div className="col-sm-auto">
                  <ul className="pagination mb-0" id="paginationCourses">
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
      <AddCourse
        show={showAddModal}
        close={closeAddModal}
        reload={fetchCourses}
        categories={categories}
      />
      <UpdateCourse
        key={modalKey}
        Course={Course}
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        reload={fetchCourses}
        categories={categories}
      />
      <DeleteCourse
        id={Course ? Course.id : -1}
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        reload={fetchCourses}
      />
    </>
  );
};

export default CourseDatatable;
