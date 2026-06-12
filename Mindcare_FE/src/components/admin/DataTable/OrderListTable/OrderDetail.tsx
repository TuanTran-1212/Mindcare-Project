import { Modal } from "react-bootstrap";
import {
  OrderService,
  type OrderRequest,
  type OrderResponse,
  type OrderStatus,
} from "../../../../services/OrderListService";
import { baseUrl } from "../../../../services/api";
import { toast } from "react-toastify";

interface openProps {
  show: boolean;
  close: () => void;
  reload: () => void;
  order: OrderResponse;
}

const OrderDetail = ({ show, close, order, reload }: openProps) => {
  // Lấy danh sách items từ form state
  const items = order.items;
  const subTotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const formattedDate = order.createdAt.split("T");

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
        reload();
        if (show) close();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      {/* View Order Modal */}
      <Modal
        size="xl"
        show={show}
        onHide={close}
        animation={true}
        centered
        id="showModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
      >
        <Modal.Header>
          <h5 className="modal-title" id="exampleModalLabel">
            View Order
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={close}
            aria-label="Close"
            id="close-modal"
          />
        </Modal.Header>
        <form className="tablelist-form" autoComplete="off">
          <Modal.Body>
            <div className="p-0" style={{ overflow: "hidden" }}>
              <input type="hidden" id="id-field" />
              <div className="row g-0">
                {/* Left Side - Products */}
                <div className="col-6 border-end d-flex flex-column">
                  <div
                    className="p-3 flex-grow-1 overflow-auto"
                    id="leftScrollArea"
                  >
                    {/* Product Select */}
                    <div className="mb-3">
                      <label htmlFor="product-select" className="form-label">
                        Add Product
                      </label>
                      <select className="form-select" id="product-select">
                        <option value="">Select Product</option>
                      </select>
                    </div>
                    {/* Product List Container - Scrollable */}
                    <div
                      className="product-list-container"
                      id="productListContainer"
                      style={{ maxHeight: 250 }}
                    >
                      {/* <div
                        className="text-center text-muted py-4"
                        id="noProductsMsg"
                      >
                        <i className="fas fa-shopping-cart fa-2x mb-2" />
                        <p className="mb-0">No products added yet</p>
                      </div> */}
                      {/* Product cards will be added here dynamically */}
                      {items?.map((item, index) => (
                        <div
                          className="product-card-item card mb-2"
                          key={index}
                        >
                          <div className="card-body p-2">
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0">
                                <img
                                  src={`${baseUrl}${item.productImg}`}
                                  alt={item.productName}
                                  className="rounded"
                                  style={{
                                    width: "30px",
                                    height: "auto",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                              <div className="flex-grow-1 ms-2">
                                <h6 className="mb-0 fs-14">
                                  {item.productName}
                                </h6>
                                <small className="text-muted">
                                  {item.productType} - ${item.unitPrice}
                                </small>
                              </div>
                              <div className="text-muted">
                                Qty: {item.quantity}
                              </div>
                            </div>
                            <div
                              className="product-total mt-2"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                fontSize: "16px",
                              }}
                            >
                              <span className="text-muted">Total: </span>
                              <span
                                className="product-total-value"
                                style={{
                                  fontSize: "18px",
                                  fontWeight: 700,
                                  color: "#198754",
                                }}
                              >
                                ${item.subtotal}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Price Summary */}
                  <div className="border-top p-3 flex-shrink-0 bg-light">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Subtotal:</span>
                      <span id="subtotalPrice">{subTotal}</span>
                    </div>
                    <div className="mb-2 border-top pt-2">
                      <label htmlFor="coupon-code" className="form-label small">
                        Coupon:
                      </label>
                      <div className="input-group input-group-md">
                        <input
                          type="text"
                          className="form-control"
                          id="coupon-code"
                          placeholder="Enter coupon code"
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          id="applyCoupon"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Discount:</span>
                      <span id="discountAmount" className="text-success">
                        -${((subTotal * order.discount) / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className="d-flex fs-5 justify-content-between fw-bold border-top pt-2">
                      <span>Final Price:</span>
                      <span id="finalPrice">${order.total}</span>
                    </div>
                  </div>
                </div>
                {/* Right Side - Order Info */}
                <div className="col-6 d-flex flex-column">
                  <div
                    className="p-3 flex-grow-1 overflow-auto"
                    id="rightScrollArea"
                  >
                    <div className="mb-3">
                      <label
                        htmlFor="customername-field"
                        className="form-label"
                      >
                        Customer Name
                      </label>
                      <input
                        type="text"
                        id="customername-field"
                        className="form-control"
                        placeholder="Enter customer name"
                        disabled
                        defaultValue={order.userFullName}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email-field" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email-field"
                        className="form-control"
                        placeholder="Enter email address"
                        disabled
                        defaultValue={order.userEmail}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone-field" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone-field"
                        className="form-control"
                        placeholder="Enter phone number"
                        disabled
                        defaultValue={order.userPhone}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="address-field" className="form-label">
                        Address
                      </label>
                      <textarea
                        id="address-field"
                        className="form-control"
                        rows={2}
                        placeholder="Enter address"
                        disabled
                        defaultValue={order.shippingAddress}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="date-field" className="form-label">
                        Order Date
                      </label>
                      <input
                        type="text"
                        id="date-field"
                        className="form-control"
                        disabled
                        defaultValue={`${formattedDate[0]} ${formattedDate[1]}`}
                      />
                    </div>
                    <div className="row mb-3">
                      <div className="col-6">
                        <label htmlFor="payment-field" className="form-label">
                          Payment Method
                        </label>
                        <select
                          className="form-control"
                          id="payment-field"
                          defaultValue={order.paymentMethod}
                          disabled
                        >
                          <option value="">Select</option>
                          <option value="Bank">Mastercard</option>
                          <option value="Visa">Visa</option>
                          <option value="COD">COD</option>
                          <option value="Paypal">Paypal</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-success"
                id="approvedOrder"
                onClick={() => handleUpdateStatus(order, "PAID")}
              >
                <i className="fas fa-check me-1" /> Approved
              </button>
              <button
                type="button"
                className="btn btn-danger"
                id="cancelOrder"
                onClick={() => {
                  handleUpdateStatus(order, "CANCELLED");
                }}
              >
                <i className="fas fa-times me-1" /> Cancelled
              </button>
              <button type="button" className="btn btn-light" onClick={close}>
                Close
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
export default OrderDetail;
