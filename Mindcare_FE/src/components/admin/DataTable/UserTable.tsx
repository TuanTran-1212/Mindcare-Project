// components/admin/DataTable/UserTable.tsx
import { useEffect, useMemo, useState } from "react";
import {
  UserService,
  type UserResponse,
  type UserRequest,
} from "../../../services/UserService";
import Pagination from "../common/Pagnition";
import AddUserModal from "../Modal/User/AddUserModal";
import UpdateUserModal from "../Modal/User/UpdateUserModal";

const UserTable = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Checkbox all state
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10;

  // Filters state
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");//remove
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateUser, setUpdateUser] = useState<UserResponse | null>(null);
  const [modalKey, setModalKey] = useState(0);

  // Fetch data
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await UserService.getAll();
      setUsers(data);
      setError(null);
    } catch (error) {
      console.log("Error fetching users:", error);
      setError("Không thể tải dữ liệu người dùng");
    } finally {
      setLoading(false);
    }
  };

  // Filter users
  const filteredUsers = useMemo(() => {
    let result = [...users];

    // Filter by role
    if (roleFilter !== "all") {
      result = result.filter((user) => user.role === roleFilter);
    }

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((user) => user.status === statusFilter);
    }

    // Filter by search (fullName hoặc email)
    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.fullName
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.trim().toLowerCase()),
      );
    }

    return result;
  }, [users, roleFilter, statusFilter, searchTerm]);

  // Pagination
  useEffect(() => {
    setTotalPages(Math.ceil(filteredUsers.length / itemsPerPage));
  }, [filteredUsers]);

  useEffect(() => {
    setCurrentPage(1);
  }, [roleFilter, statusFilter, searchTerm]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return {
      data: filteredUsers.slice(start, end),
      start: start,
      end: end,
    };
  }, [filteredUsers, currentPage]);

  // Handlers
  const handleUpdate = (user: UserResponse) => {
    setUpdateUser(user);
    setModalKey((prev) => prev + 1);
    setShowUpdateModal(true);
  };

  const handleAddSubmit = async (data: UserRequest) => {
    try {
      await UserService.create(data);
      await fetchUsers();
      setShowAddModal(false);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleEditSubmit = async (data: Partial<UserRequest>) => {
    if (!updateUser) return;

    try {
      await UserService.update(updateUser.id, data);
      await fetchUsers();
      setShowUpdateModal(false);
      setUpdateUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      try {
        await UserService.delete(id);
        setUsers((prev) => prev.filter((user) => user.id !== id));
        setSelectedUsers((prev) => prev.filter((uid) => uid !== id));
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  // Checkbox handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = paginatedData.data.map((user) => user.id);
      setSelectedUsers(allIds);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, id]);
    } else {
      setSelectedUsers((prev) => prev.filter((item) => item !== id));
    }
  };

  const isAllSelected =
    paginatedData.data.length > 0 &&
    paginatedData.data.every((user) => selectedUsers.includes(user.id));

  // Loading and Error
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
          onClick={fetchUsers}
        >
          Thử lại
        </button>
      </div>
    );
  }

  const startEntry =
    paginatedData.data.length === 0 ? 0 : paginatedData.start + 1;
  const endEntry = paginatedData.start + paginatedData.data.length;

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="card" id="customerList">
            <div className="card-header border-0">
              <div className="row align-items-center gy-3">
                <div className="col-sm">
                  <h5 className="card-title mb-0">Customer Database</h5>
                </div>
                <div className="col-sm-auto">
                  <div className="d-flex gap-1 flex-wrap">
                    <button
                      type="button"
                      className="btn btn-success add-btn"
                      data-bs-toggle="modal"
                      id="create-btn"
                      data-bs-target="#showModal"
                    >
                      <i className="ri-add-line align-bottom me-1" /> Add
                      Customer
                    </button>
                    {/* <button type="button" class="btn btn-info">
                                      <i class="ri-file-download-line align-bottom me-1"></i> Import
                                  </button> */}
                    <button
                      className="btn btn-danger btn-sm"
                      id="deleteSelectedCustomers"
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
                  <div className="col-xxl-5 col-sm-6">
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control search"
                        placeholder="Search for customer, email, phone or something..."
                        id="customerSearchInput"
                      />
                      <i className="ri-search-line search-icon" />
                    </div>
                  </div>
                  <div className="col-xxl-2 col-sm-4">
                    <div>
                      <select
                        className="form-select"
                        id="customerStatusFilter"
                        style={{ padding: "13px 13px" }}
                      >
                        <option value="all">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Block">Block</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-2 col-sm-6">
                    <button
                      type="button"
                      className="btn btn-outline-primary w-100 h-100"
                      id="resetFilter"
                      //onClick={handleResestFilter}
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
                  id="customerTable"
                >
                  <thead className="text-muted table-light">
                    <tr className="text-uppercase">
                      <th scope="col" style={{ width: 25 }}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="customerCheckAll"
                            defaultValue="option"
                          />
                        </div>
                      </th>
                      <th className="sort" data-sort="customer">
                        Customer
                      </th>
                      <th className="sort" data-sort="email">
                        Email
                      </th>
                      <th className="sort" data-sort="phone">
                        Phone
                      </th>
                      <th className="sort" data-sort="joining_date">
                        Joining Date
                      </th>
                      <th className="sort" data-sort="status">
                        Status
                      </th>
                      <th className="sort" data-sort="action">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="list form-check-all" id="customerTableBody">
                    {/* Data rendered by JavaScript */}
                  </tbody>
                </table>
              </div>
              <div className="row align-items-center pagination-wrapper">
                <div className="col-sm">
                  <div className="text-muted" id="showingCustomers">
                    Showing 0 to 0 of 0 entries
                  </div>
                </div>
                <div className="col-sm-auto">
                  <ul className="pagination mb-0" id="paginationCustomers">
                    {/* Pagination rendered by JavaScript */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddUserModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSave={handleAddSubmit}
      />
      <UpdateUserModal
        key={modalKey}
        show={showUpdateModal}
        user={updateUser}
        onHide={() => {
          setShowUpdateModal(false);
          setUpdateUser(null);
        }}
        onSave={handleEditSubmit}
      />
    </>
  );
};

export default UserTable;
