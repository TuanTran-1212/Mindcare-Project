import { useEffect, useMemo, useState } from "react";
import {
  CourseCategoryService,
  type category,
  type createCourseCategoryDTO,
} from "../../../services/CourseCategoryService";
import Pagination from "../common/Pagnition";
import AddCategory from "../Modal/Category/AddCourseCategory";
import UpdatecourseCategory from "../Modal/Category/UpdateCourseCategory";


const CategoryTable = () => {
  const [categories, setCategories] = useState<category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();

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
  const [updateCategory, setUpdateCategory] = useState<category | null>(null);
  const [modalKey, setModalKey] = useState(0); // quan ly key cho modal update
  //==========================FETCH DATA==================

  //fetch khi componet mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await CourseCategoryService.getAll();
      setCategories(data);

      setError(null);
    } catch (error) {
      console.log("error getAll message", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (category: category) => {
    setUpdateCategory(category);
    setModalKey((prev) => prev + 1);
    setShowUpdateModal(true);
  };

  //handle form submit, create catefory
  const handleAddSubmit = async (data: createCourseCategoryDTO) => {
    try {
      await CourseCategoryService.create(data);
      await fetchCategories();
      setShowAddModal(false);
    } catch (error) {
      console.error("Error creating:", error);
    }
  };

  const handleEditSubmit = async (data: createCourseCategoryDTO) => {
    if (!updateCategory) return;

    try {
      await CourseCategoryService.update(updateCategory.id, data);
      await fetchCategories();
      setShowUpdateModal(false);
      setUpdateCategory(null);
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  //handle delete
  const handleDelete = async (id: number) => {
    try {
      await CourseCategoryService.delete(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  //==========================Filter==================
  const filterCategory = useMemo(() => {
    let result = [...categories];

    if (filterStatus !== "all") {
      result = result.filter((cate) => cate.status === filterStatus);
    }

    if (searchTerm) {
      result = result.filter((cate) => {
        return cate.name
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase());
      });
    }

    return result;
  }, [categories, filterStatus, searchTerm]);

  const handleFilterByStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchFillter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleResestFilter = () => {
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
      const allIds = filterData.filterData.map((cat) => cat.id);
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
  //reset pagintion khi data change
  useEffect(() => {
    setTotalPages(Math.ceil(filterCategory.length / itemsPerPage));
  }, [filterCategory]);

  //handle change button
  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filterData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;

    return {
      filterData: filterCategory.slice(start, end),
      start: start,
      end: end,
    };
  }, [filterCategory, currentPage]);
  const startEntry =
    filterData.filterData.length === 0 ? 0 : filterData.start + 1;
  const endEntry = filterData.start + filterData.filterData.length;
  const totalEntries = filterCategory.length; // Tổng sau khi filter

  // Kiểm tra tất cả check box  đã được chọn chưa
  const isAllSelected =
    filterData.filterData.length > 0 &&
    filterData.filterData.every((cat) => selectedCategories.includes(cat.id));

  // handle fetch
  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
        <button
          className="btn btn-sm btn-outline-danger ms-3"
          onClick={fetchCategories}
        >
          Thử lại
        </button>
      </div>
    );
  }
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
              <form>
                <div className="row g-3">
                  <div className="col-xl-5 col-sm-6">
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control search"
                        id="categorySearch"
                        placeholder="Search for categories..."
                        value={searchTerm}
                        onChange={handleSearchFillter}
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
                      <th className="sort" data-sort="books">
                        Number of Books
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
                    {filterData.filterData.map((cate) => {
                      return (
                        <tr key={cate.id}>
                          <td>
                            <div className="form-check" key={cate.id}>
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
                              0
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                cate.status === "active"
                                  ? "bg-success-subtle text-success"
                                  : "bg-danger-subtle text-danger"
                              }`}
                            >
                              {cate.status}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <button
                                className="btn btn-sm btn-outline-success edit-category-btn"
                                data-id={cate.id}
                                title="Edit"
                                onClick={() => handleUpdate(cate)}
                              >
                                <i className="fas fa-edit" />
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger delete-category-btn"
                                data-id={cate.id}
                                // data-bs-toggle="modal"
                                // data-bs-target="#deleteCategoryModal"
                                title="Delete"
                                onClick={() => handleDelete(cate.id)}
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
                    {/* Showing{" "}
                    {filterCategory.length >= 1 ? filterData.start + 1 : 0} to{" "}
                    {Math.min(filterData.end, filterData.filterData.length)} of{" "}
                    {filterData.filterData.length} entries */}
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
      <AddCategory
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSave={handleAddSubmit}
      />
      <UpdatecourseCategory
        key={modalKey}
        show={showUpdateModal}
        category={updateCategory}
        onHide={() => setShowUpdateModal(false)}
        onSave={handleEditSubmit}
      />
    </>
  );
};

export default CategoryTable;
