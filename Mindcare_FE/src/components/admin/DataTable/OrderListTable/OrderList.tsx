import { useEffect, useMemo, useState } from "react";
import {
  OrderService,
  type OrderRequest,
  type OrderResponse,
  type OrderStatus,
} from "../../../../services/OrderListService";
import { useForm, type SubmitHandler } from "react-hook-form";
import { baseUrl } from "../../../../services/api";
import Pagination from "../../common/Pagnition";
import OrderDetail from "./OrderDetail";
import { toast } from "react-toastify";

interface SearchForm {
  keyword: string;
  filterStatus: string;
}

const OrderList = () => {
  const defaultData: OrderResponse = {
    id: 0,
    orderCode: "",
    userId: 0,
    userFullName: "",
    userAvatar: "",
    userEmail: "",
    userPhone: "",
    shippingAddress: "",
    paymentMethod: "",
    status: "PENDING",
    shippingFee: 0,
    discount: 0,
    total: 0,
    createdAt: "",
    paidAt: null,
    items: [],
  };
  //STATE STORED
  const [orderLists, setOrderLists] = useState<OrderResponse[]>([]);
  const [chooseOrder, setChooseOrder] = useState<OrderResponse>(defaultData);
  const [showModal, setShowModal] = useState<boolean>(false);

  //STORED: check box all state
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);

  // filters state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  //STORED: pagition page
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10;

  //FETCH
  const fetchOrderLists = async () => {
    try {
      const data = await OrderService.getAll();
      setOrderLists(data);
    } catch (error) {
      console.log("error getAll message", error);
    }
  };

  useEffect(() => {
    fetchOrderLists();
  }, []);

  //NOTE: search field css
  const serchField = {
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "1.05rem",
  };
  const statusConfig = {
    PENDING: "bg-warning-subtle text-warning",
    PAID: "bg-success-subtle text-success",
    CANCELLED: "bg-danger-subtle text-danger",
  };

  //FILTER
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

  //LOGIC: create final data

  const finalData = useMemo(() => {
    // cho cac thuoc tinh vaof bien
    let filteredResult = [...orderLists];

    // TODO: filter
    if (filterStatus !== "all") {
      filteredResult = filteredResult.filter((order) => {
        if (filterStatus === "Paid") {
          return order.status === "PAID";
        } else if (filterStatus === "Pending")
          return order.status === "PENDING";
        else return order.status === "CANCELLED";
      });
    }

    if (searchTerm) {
      const term = searchTerm.trim().toLowerCase();
      filteredResult = filteredResult.filter((order) => {
        return (
          order.userFullName?.toLowerCase().includes(term) ||
          order.orderCode?.toLowerCase().includes(term) ||
          order.userPhone?.toLowerCase().includes(term)
        );
      });
    }

    //TODO: pagnition
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    const final = filteredResult.slice(start, end);

    return final;
  }, [orderLists, filterStatus, searchTerm, currentPage]);

  //==========================CHECK BOX==============================

  // Checkbox header - chọn tất cả
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      // Chọn tất cả ID của categories hiện tại
      const allIds = finalData.map((order: OrderResponse) => order.id);
      setSelectedOrder(allIds);
    } else {
      setSelectedOrder([]);
    }
  };

  // Checkbox từng dòng
  const handleSelectCourse = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedOrder((prev) => [...prev, id]);
    } else {
      setSelectedOrder((prev) => prev.filter((item) => item !== id));
    }
  };
  //CHECKING:  Kiểm tra tất cả check box  đã được chọn chưa
  const isAllSelected =
    finalData.length > 0 &&
    finalData.every((cat) => selectedOrder.includes(cat.id));

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

  console.log(orderLists);

  // toggle
  const handleUpdateStatus = (order: OrderResponse, status: OrderStatus) => {
    const OrderRequest: OrderRequest = {
      userId: order.userId,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      shippingFee: order.shippingFee,
      discount: order.discount,
      orderStatus: status, /////
      items: order.items.map((item) => {
        return {
          productType: item.productType,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        };
      }),
    };
    console.log(OrderRequest);
    toast
      .promise(OrderService.update(order.id, OrderRequest), {
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
        fetchOrderLists();
        if (showModal) close();
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      {/* Orders Card */}
      <div className="row">
        <div className="col-lg-12">
          <div className="card" id="orderList">
            <div className="card-header border-0">
              <div className="row align-items-center gy-3">
                <div className="col-sm">
                  <h5 className="card-title mb-0">Order Lists</h5>
                </div>
                <div className="col-sm-auto">
                  <div className="d-flex gap-1 flex-wrap">
                    <button
                      className="btn btn-danger btn-sm"
                      id="deleteSelectedOrders"
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
                  <div className="col-xxl-5 col-sm-6">
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control search"
                        placeholder="Search for orders..."
                        style={serchField}
                        {...register("keyword")}
                      />
                      <i className="ri-search-line search-icon" />
                    </div>
                  </div>

                  <div className="col-xxl-2 col-sm-4">
                    <div>
                      <select
                        className="form-select"
                        id="orderStatusFilter"
                        style={{ padding: "13px 13px" }}
                        {...register("filterStatus")}
                        onChange={handleFilterByStatus}
                      >
                        <option value="all" selected>
                          All
                        </option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
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
                  id="orderTable"
                >
                  <thead className="text-muted table-light">
                    <tr className="text-uppercase">
                      <th scope="col" style={{ width: 25 }}>
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
                      <th className="sort" data-sort="order_code">
                        Code
                      </th>
                      <th className="sort" data-sort="customer_name">
                        Customer
                      </th>
                      {/* <th className="sort" data-sort="email">
                        Email
                      </th> */}

                      <th className="sort" data-sort="phone">
                        Phone
                      </th>
                      <th className="sort" data-sort="date">
                        Date
                      </th>
                      <th className="sort" data-sort="payment">
                        Payment Method
                      </th>
                      <th className="sort" data-sort="status">
                        Delivery Status
                      </th>
                      <th className="sort" data-sort="city">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="list form-check-all" id="orderTableBody">
                    {/* Data rendered by JavaScript */}
                    {finalData.map((order) => {
                      const handleOpenModal = (order: OrderResponse) => () => {
                        setChooseOrder(order);

                        setShowModal(true);
                      };

                      return (
                        <tr key={order.id}>
                          <th scope="row">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="checkAll"
                                checked={selectedOrder.includes(order.id)}
                                onChange={(e) =>
                                  handleSelectCourse(order.id, e.target.checked)
                                }
                              />
                            </div>
                          </th>
                          <td className="id">${order.orderCode}</td>
                          <td className="customer_name">
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 me-2">
                                <img
                                  src={`${baseUrl}${order.userAvatar}`}
                                  alt=""
                                  className="avatar-sm rounded-circle"
                                />
                              </div>
                              <div className="flex-grow-1">
                                {order.userFullName}
                              </div>
                            </div>
                          </td>
                          {/* <td className="email">{order.userEmail || "-"}</td> */}

                          <td className="phone">{order.userPhone || "-"}</td>
                          <td className="date">
                            <div>
                              {new Date(order.createdAt).toLocaleDateString(
                                "vi-VN",
                              )}
                            </div>
                            <div>
                              {new Date(order.createdAt).toLocaleTimeString(
                                "vi-VN",
                              )}
                            </div>
                          </td>
                          <td className="payment">{order.paymentMethod}</td>
                          <td className="status">
                            <span
                              className={`badge ${statusConfig[order.status as keyof typeof statusConfig]}  text-uppercase`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td>
                            <div
                              className="d-grid gap-2"
                              style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
                            >
                              <button
                                className="btn btn-sm btn-outline-primary view-btn"
                                data-bs-toggle="modal"
                                onClick={handleOpenModal(order)}
                                title="View Detail"
                              >
                                <i className="fas fa-eye" />
                              </button>
                              <button
                                className="btn btn-sm btn-outline-warning pending-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#pendingOrder"
                                title="Mark as Pending"
                                onClick={() => {
                                  if (order.status !== "PENDING") {
                                    handleUpdateStatus(order, "PENDING");
                                  }
                                }}
                              >
                                <i className="fas fa-clock" />
                              </button>
                              <button
                                className="btn btn-sm btn-outline-secondary canceled-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#pendingOrder"
                                title="Mark as Canceled"
                                onClick={() => {
                                  if (order.status !== "CANCELLED") {
                                    handleUpdateStatus(order, "CANCELLED");
                                  }
                                }}
                              >
                                <i className="fa-solid fa-circle-xmark"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger delete-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteOrder"
                                title="Delete"
                              >
                                <i className="fas fa-trash" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {/* dddddd */}
                  </tbody>
                </table>
              </div>
              <div className="row align-items-center pagination-wrapper">
                <div className="col-sm">
                  <div className="text-muted" id="showingOrders">
                    Showing {startEntry} to {endEntry} of {totalEntries} entries
                  </div>
                </div>
                <div className="col-sm-auto">
                  <ul className="pagination mb-0" id="paginationOrders">
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
      <OrderDetail
        show={showModal}
        close={() => setShowModal(false)}
        reload={fetchOrderLists}
        order={chooseOrder}
      />
    </>
  );
};

export default OrderList;
