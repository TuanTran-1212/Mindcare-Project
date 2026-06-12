import { useEffect, useMemo, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  CourseCategoryService,
  type categoryGet,
} from "../../../../services/CourseCategoryService";

import Pagination from "../../common/Pagnition";

import UpdateCourseCategory from "./UpdateCourseModal";
import AddCourseCategory from "./AddCourseModal";
import DeleteCourseCategory from "./DeleteCourseModal";

interface SearchForm {
  keyword: string;
  filterStatus: string;
}

const CategoryTable = () => {
  const [categories, setCategories] = useState<categoryGet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //check box all state
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  //pagition page
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10;

  // filters state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // modal toggle state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<categoryGet | null>(
    null,
  );
  const [modalKey, setModalKey] = useState(0); // quan ly key cho modal update

  //                                      ==========================FETCH DATA==================

  //fetch khi componet mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await CourseCategoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.log("error getAll message", error);
    } finally {
      setLoading(false);
    }
  };

  const showUpdateForm = (category: categoryGet) => {
    setSelectedCategory(category);
    setModalKey((prev) => prev + 1);
    setShowUpdateModal(true);
  };

  const showDeleteWarning = (category: categoryGet) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  //                                      ==========================Filter==================

  const finalData = useMemo(() => {
    // cho cac thuoc tinh vaof bien
    let filteredResult = [...categories];

    // TODO: filter
    if (filterStatus !== "all") {
      filteredResult = filteredResult.filter((cate) => {
        if (filterStatus === "active") {
          return cate.active === true;
        }
        return cate.active === false;
      });
    }

    if (searchTerm) {
      filteredResult = filteredResult.filter((cate) => {
        return cate.name
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase());
      });
    }

    //TODO: pagnition
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    const final = filteredResult.slice(start, end);

    return final;
  }, [categories, filterStatus, searchTerm, currentPage]);

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

  //==========================CHECK BOX==============================

  // Checkbox header - chọn tất cả
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      // Chọn tất cả ID của categories hiện tại
      const allIds = finalData.map((cat) => cat.id);
      setSelectedCategories(allIds);
    } else {
      setSelectedCategories([]);
    }
  };

  // Checkbox từng dòng
  const handleSelectCategory = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, id]);
    } else {
      setSelectedCategories((prev) => prev.filter((item) => item !== id));
    }
  };

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

  //CHECKING:  Kiểm tra tất cả check box  đã được chọn chưa
  const isAllSelected =
    finalData.length > 0 &&
    finalData.every((cat) => selectedCategories.includes(cat.id));

  // NOTE:  handle fetch
  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  console.log(finalData);
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
      {/* Categories Card */}
      <div className="row">
        <div className="col-lg-12">
          <div className="card" id="categoryList">
            {/* HEADER */}
            <div className="card-header border-0">
              <div className="row align-items-center gy-3">
                <div className="col-sm">
                  <h5 className="card-title mb-0">Categories</h5>
                </div>
                <div className="col-sm-auto">
                  <div className="d-flex gap-1 flex-wrap">
                    <button
                      type="button"
                      className="btn btn-success btn-lg add-btn"
                      //   data-bs-toggle="modal"
                      id="create-btn"
                      //   data-bs-target="#addCategoryModal"
                      onClick={() => setShowAddModal(true)}
                    >
                      <i className="ri-add-line align-bottom me-1" />
                      Add Category
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      id="deleteSelectedCategories"
                      style={{ display: "none" }}
                      onClick={() => setShowDeleteModal(false)}
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
                        id="categorySearch"
                        placeholder="Search for categories..."
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
                        id="categoryStatusFilter"
                        value={filterStatus}
                        onChange={handleFilterByStatus}
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
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
                      <i className="fas fa-refresh me-1"></i>Reset Filter
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
                  id="categoryTable"
                >
                  <thead className="text-muted table-light">
                    <tr className="text-uppercase">
                      <th scope="col" style={{ width: 25 }}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="checkAll"
                            checked={isAllSelected}
                            onChange={handleSelectAll}
                          />
                        </div>
                      </th>
                      <th className="sort" data-sort="name">
                        Name
                      </th>
                      <th className="sort" data-sort="Courses">
                        Number of Courses
                      </th>
                      <th className="sort" data-sort="status">
                        Status
                      </th>
                      <th className="sort" data-sort="action">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="list form-check-all" id="categoryTableBody">
                    {/* Data rendered by JavaScript */}

                    {finalData.map((cate) => {
                      return (
                        <tr key={cate.id}>
                          <td>
                            <div className="form-check">
                              <input
                                className="form-check-input category-checkbox"
                                type="checkbox"
                                checked={selectedCategories.includes(cate.id)}
                                onChange={(e) =>
                                  handleSelectCategory(
                                    cate.id,
                                    e.target.checked,
                                  )
                                }
                                id={`categoryCheck${cate.id}`}
                              />
                            </div>
                          </td>
                          <td>
                            <h6 className="fs-14 mb-0">{cate.name}</h6>
                          </td>
                          <td>
                            <span
                              className="badge bg-primary-subtle text-primary"
                              style={{ fontSize: 18 }}
                            >
                              {cate.courseCount}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                cate.active
                                  ? "bg-success-subtle text-success"
                                  : "bg-danger-subtle text-danger"
                              }`}
                            >
                              {cate.active ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <button
                                className="btn btn-sm btn-outline-success edit-category-btn"
                                data-id={cate.id}
                                title="Edit"
                                onClick={() => showUpdateForm(cate)}
                              >
                                <i className="fas fa-edit" />
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger delete-category-btn"
                                data-id={cate.id}
                                // data-bs-toggle="modal"
                                // data-bs-target="#deleteCategoryModal"
                                title="Delete"
                                onClick={() => showDeleteWarning(cate)}
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
                  <div className="text-muted" id="showingCategories">
                    Showing {startEntry} to {endEntry} of {totalEntries} entries
                  </div>
                </div>
                <div className="col-sm-auto">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddCourseCategory
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        reload={fetchCategories}
      />
      <UpdateCourseCategory
         key={modalKey}
        show={showUpdateModal}
        category={selectedCategory}
        onHide={() => setShowUpdateModal(false)}
        reload={fetchCategories}
      />
      <DeleteCourseCategory
        show={showDeleteModal}
        category={selectedCategory}
        onHide={() => setShowDeleteModal(false)}
        reload={fetchCategories}
      />
    </>
  );
};

export default CategoryTable;
