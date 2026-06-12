// src/pages/UserProfile.tsx
import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import AvatarSection from "../../../components/User/userProfile/AvatarSection";
// import PointsInfo from "../../../components/User/userProfile/PointsInfo";
// import PersonalInfo from "../../../components/User/userProfile/PersonalInfo";
// import DeliveryAddress from "../../../components/User/userProfile/DeliveryAddress";
// import PaymentMethod from "../../../components/User/userProfile/PaymentMethod";
// import Orders from "../../../components/User/userProfile/Orders";
// import ReceiptModal from "../../../components/User/userProfile/ReceiptModal";
// import type {
//   UserProfile as UserProfileType,
//   OrderData,
// } from "../../../data/UserData";

// type MainTab = "personal" | "orders";

/**
 * UserProfile page — requires a logged-in user stored in localStorage.
 * Redirects to /login if no session found.
 *
 * Layout:
 *  - Left column  : AvatarSection + PointsInfo + Logout button
 *  - Right column : PersonalInfo + DeliveryAddress + PaymentMethod
 *  - Orders tab   : Purchases / Subscriptions / Refunds with ReceiptModal
 *
 * Payment tab and a second Order tab are defined but hidden (display:none)
 * as per the original HTML structure.
 */
const UserProfile: React.FC = () => {
  // const navigate = useNavigate();
  // const [user, setUser] = useState<UserProfileType | null>(null);
  // const [avatarSrc, setAvatarSrc] = useState("");
  // const [activeTab, setActiveTab] = useState<MainTab>("personal");
  // const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // // Load user from localStorage session
  // useEffect(() => {
  //   const id = localStorage.getItem("loggedInUserId");
  //   if (!id) {
  //     navigate("/login");
  //     return;
  //   }
  //   const found = getUserById(Number(id));
  //   if (!found) {
  //     navigate("/login");
  //     return;
  //   }

  //   // eslint-disable-next-line react-hooks/set-state-in-effect
  //   setUser(found);
  //   setAvatarSrc(found.avatar);
  // }, [user, navigate]);

  // Auto-dismiss message after 5 seconds
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 5000);
    return () => clearTimeout(t);
  }, [message]);

  return (
    <main className="profile-main pt-3">
      <div className="container">
        {/* Tab Content */}
        <div className="tab-content">
          {/* Personal Info Tab */}
          <div id="personal" className="tab-pane active">
            <div className="profile-grid">
              <div className="profile-left">
                {/* Avatar Section */}
                <section className="profile-section avatar-section">
                  <h2 className="section-title">Ảnh Đại Diện</h2>
                  <div className="avatar-container">
                    <img
                      id="avatar-preview"
                      src="assets/img/1.png"
                      alt="Avatar"
                      className="avatar-image"
                    />
                    <label
                      htmlFor="avatar-upload"
                      className="avatar-upload-btn"
                    >
                      <i className="fas fa-camera" />
                    </label>
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                  </div>
                </section>
                <button className="logout-btn">Đăng Xuất</button>
              </div>
              <div className="profile-right">
                <section className="profile-section">
                  <h2 className="section-title">Thông Tin Cơ Bản</h2>
                  <form id="basic-form" className="profile-form">
                    <div className="form-group">
                      <label htmlFor="full-name">Họ và Tên</label>
                      <input
                        type="text"
                        id="full-name"
                        name="full-name"
                        defaultValue="Nguyễn Văn A"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue="nguyenvana@example.com"
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Số Điện Thoại</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        defaultValue="+84 123 456 789"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="username">Tên Đăng Nhập</label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        defaultValue="nguyenvana"
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Mật Khẩu</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        defaultValue={123456}
                      />
                    </div>
                    <button type="submit" className="save-btn">
                      Lưu Thay Đổi
                    </button>
                  </form>
                </section>
                {/* Shipping Address */}
                <section className="profile-section">
                  <h2 className="section-title">Địa Chỉ Giao Hàng</h2>
                  <form id="shipping-form" className="profile-form">
                    <div className="form-group">
                      <textarea
                        id="shipping-address"
                        name="shipping-address"
                        rows={3}
                        defaultValue={"123 Đường ABC, Quận XYZ, TP.HCM"}
                      />
                    </div>
                    <button type="submit" className="save-btn">
                      Lưu Địa Chỉ
                    </button>
                  </form>
                </section>
                {/* Payment Methods */}
                {/* <section class="profile-section">
                          <h2 class="section-title">Phương Thức Thanh Toán</h2>
                          <form id="payment-form" class="profile-form">
                              <div class="form-group">
                                  <label for="card-number">Số Thẻ Tín Dụng</label>
                                  <input type="text" id="card-number" name="card-number"
                                      placeholder="1234 5678 9012 3456" maxlength="19">
                              </div>
                              <div class="form-row">
                                  <div class="form-group">
                                      <label for="expiry-date">Ngày Hết Hạn</label>
                                      <input type="text" id="expiry-date" name="expiry-date" placeholder="MM/YY"
                                          maxlength="5">
                                  </div>
                                  <div class="form-group">
                                      <label for="cvv">CVV</label>
                                      <input type="text" id="cvv" name="cvv" placeholder="123" maxlength="3">
                                  </div>
                              </div>
                              <div class="form-group">
                                  <label for="card-name">Tên Trên Thẻ</label>
                                  <input type="text" id="card-name" name="card-name" placeholder="NGUYEN VAN A">
                              </div>
                              <button type="submit" class="save-btn">Lưu Phương Thức Thanh Toán</button>
                          </form>
                      </section> */}
              </div>
            </div>
          </div>
          {/* My Course Tab */}
          <div id="my-course" className="tab-pane">
            {/* Course Filter Bar */}
            <div className="course-filter-bar p-2 mb-2">
              <button className="course-filter-btn active" data-filter="all">
                All Courses
              </button>
              <button className="course-filter-btn" data-filter="in-progress">
                In Progress
              </button>
              <button className="course-filter-btn" data-filter="completed">
                Completed
              </button>
            </div>
            {/* Course Cards Grid*/}
            <div className="my-course-grid" id="my-course-grid">
              {/* Will be rendered dynamically by profile.js */}
            </div>
          </div>
          {/* Orders Tab */}
          <div id="orders" className="tab-pane">
            {/* Sub Tab Navigation */}
            <div className="sub-tab-navigation p-2">
              <button className="sub-tab-btn active" data-sub-tab="pendings">
                Pendings
              </button>
              <button className="sub-tab-btn" data-sub-tab="paid">
                Paid
              </button>
              <button className="sub-tab-btn" data-sub-tab="cancelled">
                Cancelled
              </button>
            </div>
            {/* Sub Tab Content */}
            <div className="sub-tab-content">
              {/* Pendings Sub Tab */}
              <div id="pendings" className="sub-tab-pane active">
                <div className="table-container">
                  <table className="purchase-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Date</th>
                        <th>Total Price</th>
                        <th>Payment Method</th>
                        <th>Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Introduction to Coaching</td>
                        <td>2023-10-01</td>
                        <td className="price-free">$0</td>
                        <td>Free Coupon</td>
                        <td>
                          <button className="receipt-btn">Receipt</button>
                        </td>
                      </tr>
                      <tr>
                        <td>Basic Life Skills</td>
                        <td>2023-09-15</td>
                        <td className="price-free">$0</td>
                        <td>Free Coupon</td>
                        <td>
                          <button className="receipt-btn">Receipt</button>
                        </td>
                      </tr>
                      <tr>
                        <td>Mindfulness Fundamentals</td>
                        <td>2023-08-20</td>
                        <td className="price-free">$0</td>
                        <td>Free Coupon</td>
                        <td>
                          <button className="receipt-btn">Receipt</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Paid Sub Tab */}
              <div id="paid" className="sub-tab-pane">
                <div className="empty-state">
                  <p>No paid orders found.</p>
                </div>
              </div>
              {/* Cancelled Sub Tab */}
              <div id="cancelled" className="sub-tab-pane">
                <div className="empty-state">
                  <p>No cancelled orders found.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
