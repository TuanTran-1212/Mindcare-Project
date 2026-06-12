
import StatCard from "../../../components/admin/Card/StatCard";
import CardRevenue from "../../../components/admin/Card/CardRevenue";
import CardSalesByLocations from "../../../components/admin/Card/CardSalesByLocations";
import Pagination from "../../../components/admin/Table/Pagination";
import { usePagination } from "../../../hooks/usePagination";
import { ADMIN_BOOKS } from "../../../data/BookData";
import { ADMIN_COURSES } from "../../../data/CourseData";
import { ADMIN_CUSTOMERS, ADMIN_ORDERS,  } from "../../../data/UserData";
import type {
  BookRow,
  CourseRow,
  CustomerRow,
  
  OrderRow,
} from "../../../types";
import { Link } from "react-router-dom";

// ─── Stat Cards config ───────────────────────────────────────────────────────
const STAT_CARDS = [
  {
    title: "Total Earnings",
    value: 429,
    prefix: "$",
    suffix: "k",
    badgeText: "+99.999 %",
    badgeClass: "text-success",
    linkText: "View net earnings",
    iconClass: "fas fa-dollar-sign text-success",
    iconBgClass: "bg-success-subtle",
  },
  {
    title: "Orders",
    value: 28334,
    prefix: "",
    suffix: "",
    badgeText: "-3.57 %",
    badgeClass: "text-danger",
    linkText: "View all orders",
    iconClass: "fas fa-shopping-bag text-info",
    iconBgClass: "bg-info-subtle",
  },
  {
    title: "Customers",
    value: 183,
    prefix: "",
    suffix: "M",
    badgeText: "+99.999 %",
    badgeClass: "text-success",
    linkText: "See details",
    iconClass: "fas fa-user-circle text-warning",
    iconBgClass: "bg-warning-subtle",
  },
  {
    title: "My Balance",
    value: 165,
    prefix: "$",
    suffix: "k",
    badgeText: "+99.9999 %",
    badgeClass: "text-muted",
    linkText: "Withdraw money",
    iconClass: "fas fa-wallet text-primary",
    iconBgClass: "bg-primary-subtle",
  },
];

// ─── Generic sort dropdown ────────────────────────────────────────────────────
const SortDropdown = ({ label = "Today" }: { label?: string }) => (
  <div className="dropdown card-header-dropdown">
    <a className="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown">
      <span className="fw-semibold text-uppercase fs-12">Sort by: </span>
      <span className="text-muted">
        {label}
        <i className="fas fa-chevron-down ms-1"></i>
      </span>
    </a>
    <div className="dropdown-menu dropdown-menu-end">
      {[
        "Today",
        "Yesterday",
        "Last 7 Days",
        "Last 30 Days",
        "This Month",
        "Last Month",
      ].map((o) => (
        <a key={o} className="dropdown-item" href="#">
          {o}
        </a>
      ))}
    </div>
  </div>
);

// ─── Top Books Table ──────────────────────────────────────────────────────────
const TopBooksTable = () => {
  const { paginatedData, currentPage, totalPages, goToPage, showingText } =
    usePagination<BookRow>(ADMIN_BOOKS, 5);

  return (
    <div className="card">
      <div className="card-header align-items-center d-flex">
        <h4 className="card-title mb-0 flex-grow-1">Top Book Selling</h4>
        <div className="flex-shrink-0">
          <SortDropdown />
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive table-card">
          <table className="table table-hover table-centered align-middle table-nowrap mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price ($)</th>
                <th>Orders</th>
                <th style={{ textAlign: "right" }}>Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((book) => (
                <tr key={book.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar-index-book bg-light rounded p-1 me-3 mb-2">
                        <img
                          src={book.cover}
                          alt=""
                          className="img-fluid d-block w-100 h-100 object-fit-cover"
                        />
                      </div>
                      <div>
                        <h5 className=" my-1  wrapper">
                          <Link to={"/"} className="text-reset ">
                            {book.name}
                          </Link>
                        </h5>
                        <span className="text-muted">15 Mar 2021 </span>
                      </div>
                    </div>
                  </td>

                  <td>{book.price.toFixed(2)}</td>
                  <td>{book.orders.toLocaleString()}</td>
                  <td style={{ textAlign: "right" }}>
                    {book.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          showingText={showingText}
          onPageChange={goToPage}
        />
      </div>
    </div>
  );
};

// ─── Top Courses Table ────────────────────────────────────────────────────────
const TopCoursesTable = () => {
  const { paginatedData, currentPage, totalPages, goToPage, showingText } =
    usePagination<CourseRow>(ADMIN_COURSES, 5);

  return (
    <div className="card">
      <div className="card-header align-items-center d-flex">
        <h4 className="card-title mb-0 flex-grow-1">Top Course Selling</h4>
        <div className="flex-shrink-0">
          <SortDropdown />
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive table-card">
          <table className="table table-centered table-hover table-nowrap mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price ($)</th>
                <th>Orders</th>
                <th style={{ textAlign: "right" }}>Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((course) => (
                <tr key={course.id} style={{ borderBottomWidth: 1 }}>
                  <div className="d-flex align-items-center">
                    <div className="avatar-index-book bg-light rounded p-1 me-3 mb-2">
                      <img
                        src={course.thumbnail}
                        alt=""
                        className="img-fluid d-block w-100 h-100 object-fit-cover"
                      />
                    </div>
                    <div>
                      <h5 className=" my-1  wrapper">
                        <Link to={"/"} className="text-reset ">
                          {course.name}
                        </Link>
                      </h5>
                      <span className="text-muted">15 Mar 2021 </span>
                    </div>
                  </div>
                  <td>{course.price.toFixed(2)}</td>
                  <td>{course.orders.toLocaleString()}</td>
                  <td style={{ textAlign: "right" }}>
                    {course.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          showingText={showingText}
          onPageChange={goToPage}
        />
      </div>
    </div>
  );
};

// ─── Top Customers Table ──────────────────────────────────────────────────────
const TopCustomersTable = () => {
  const { paginatedData, currentPage, totalPages, goToPage, showingText } =
    usePagination<CustomerRow>(ADMIN_CUSTOMERS, 5);

  return (
    <div className="card card-height-100">
      <div className="card-header align-items-center d-flex">
        <h4 className="card-title mb-0 flex-grow-1">Top Customer</h4>
        <div className="flex-shrink-0">
          <div className="dropdown card-header-dropdown">
            <a
              className="text-reset dropdown-btn"
              href="#"
              data-bs-toggle="dropdown"
            >
              <span className="text-muted">
                Report<i className="fas fa-chevron-down ms-1"></i>
              </span>
            </a>
            <div className="dropdown-menu dropdown-menu-end">
              <a className="dropdown-item" href="#">
                Download Report
              </a>
              <a className="dropdown-item" href="#">
                Export
              </a>
              <a className="dropdown-item" href="#">
                Import
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive table-card">
          <table className="table table-centered table-hover align-middle table-nowrap mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Orders</th>
                <th style={{ textAlign: "right" }}>Total Spent ($)</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((c) => (
                <tr key={c.id} style={{ borderBottomWidth: 1 }}>
                  <div className="d-flex align-items-center">
                    <div className=" me-3 ">
                      <img
                        src={c.avatar}
                        alt=""
                        className="rounded-circle"
                        style={{ width: 50, height: 50 }}
                      />
                    </div>
                    <div>
                      <h5 className=" my-1 text-truncate wrapper fw-medium">
                        <Link to={"/"} className="text-reset ">
                          {c.name}
                        </Link>
                      </h5>
                      <span className="text-muted"></span>
                    </div>
                  </div>
                  <td>{c.orders}</td>
                  <td style={{ textAlign: "right" }}>
                    {c.totalSpent.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          showingText={showingText}
          onPageChange={goToPage}
        />
      </div>
    </div>
  );
};

// ─── Recent Bookings Table ────────────────────────────────────────────────────
const RecentBookingsTable = () => {
  // const { currentPage, totalPages, goToPage, showingText } =
  //   usePagination<BookingRow>(ADMIN_BOOKINGS, 5);

  return (
    <div className="card card-height-100">
      <div className="card-header align-items-center d-flex">
        <h4 className="card-title mb-0 flex-grow-1">Recent Booking</h4>
        <div className="flex-shrink-0">
          <div className="dropdown card-header-dropdown">
            <a
              className="text-reset dropdown-btn"
              href="#"
              data-bs-toggle="dropdown"
            >
              <span className="text-muted">
                View All<i className="fas fa-chevron-down ms-1"></i>
              </span>
            </a>
            <div className="dropdown-menu dropdown-menu-end">
              <a className="dropdown-item" href="#">
                View All Bookings
              </a>
              <a className="dropdown-item" href="#">
                Pending
              </a>
              <a className="dropdown-item" href="#">
                Confirmed
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        
      </div>
    </div>
  );
};

// ─── Recent Orders Table ──────────────────────────────────────────────────────
const RecentOrdersTable = () => {
  const { paginatedData, currentPage, totalPages, goToPage, showingText } =
    usePagination<OrderRow>(ADMIN_ORDERS, 5);

  return (
    <div className="card">
      <div className="card-header align-items-center d-flex">
        <h4 className="card-title mb-0 flex-grow-1">Recent Orders</h4>
        <div className="flex-shrink-0">
          <SortDropdown />
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive table-card">
          <table className="table table-hover table-centered align-middle table-nowrap mb-0">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((o) => (
                <tr key={o.id}>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-2 ">
                      <img
                        src={o.avatar}
                        alt=""
                        className="avatar-sm rounded-circle"
                        style={{ width: 50, height: 50 }}
                      />
                    </div>
                    <div>
                      <h5 className=" my-1 text-truncate wrapper fw-medium">
                        <Link to={"/"} className="text-reset ">
                          {o.customer}
                        </Link>
                      </h5>
                      <span className="text-muted"></span>
                    </div>
                  </div>
                  <td>{o.product}</td>
                  <td>${o.amount}</td>
                  <td>
                    <span className={`badge ${o.statusClass}`}>{o.status}</span>
                  </td>
                  <td>{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          showingText={showingText}
          onPageChange={goToPage}
        />
      </div>
    </div>
  );
};

// ─── Dashboard Page ───────────────────────────────────────────────────────────
const Dashboard = () => {
  return (
    <>
      {/* Stat Cards Row */}
      <div className="row" style={{ marginBottom: 40 }}>
        {STAT_CARDS.map((card) => (
          <div className="col-xl-3 col-md-6" key={card.title}>
            <StatCard
              title={card.title}
              value={card.value}
              prefix={card.prefix}
              suffix={card.suffix}
              badgeText={card.badgeText}
              badgeClass={card.badgeClass}
              linkText={card.linkText}
              iconClass={card.iconClass}
              iconBgClass={card.iconBgClass}
            />
          </div>
        ))}
      </div>

      {/* Revenue + Sales by Locations */}
      <div className="row" style={{ marginBottom: 20 }}>
        <div className="col-xl-8">
          <CardRevenue />
        </div>
        <div className="col-xl-4">
          <CardSalesByLocations />
        </div>
      </div>

      {/* Tables Row 1 */}
      <div className="row" style={{ marginBottom: 20 }}>
        <div className="col-xl-6 col-md-12">
          <TopBooksTable />
        </div>
        <div className="col-xl-6 col-md-12">
          <TopCoursesTable />
        </div>
        <div className="col-xl-6 col-md-12">
          <TopCustomersTable />
        </div>
        <div className="col-xl-6 col-md-12">
          <RecentBookingsTable />
        </div>
        <div className="col-12">
          <RecentOrdersTable />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
