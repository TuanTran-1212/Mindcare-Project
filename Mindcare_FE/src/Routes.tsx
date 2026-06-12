import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";

import Home from "./pages/User/Home";
import AboutUs from "./pages/User/AboutUs";
import ListBlog from "./pages/User/Blog/ListBlog";
import Blog from "./pages/User/Blog/BlogDetail";
import Shopping from "./pages/User/Shop/Shoping";
import BookShop from "./pages/User/Shop/BookShop";
import BookDetail from "./components/User/shoping/ProductDetail/BookDetail";
import CourseShop from "./pages/User/Shop/CourseShop";
import CourseDetail from "./components/User/shoping/ProductDetail/CourseDetail";
import CoachList from "./pages/User/Coach/CoachList";
import CoachDetail from "./pages/User/Coach/CoachDetail";
import Contact from "./pages/User/Contact/Contact";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/Login/ForgotPassWordPage";
import UserProfile from "./pages/User/UserProfile/UserProfile";
import PaymentConfirm from "./pages/User/paymentConfirm/PaymentConfirm";
import BookingSection from "./pages/User/Booking/Booking";

import Dashboard from "./pages/admin/Dashboard/Dashboard";
import BooksList from "./pages/admin/Products/BooksList";
import BooksCategory from "./pages/admin/Products/BooksCategory";
import CoursesList from "./pages/admin/Products/CoursesList";
import CoursesCategory from "./pages/admin/Products/CoursesCategory";
import OrdersList from "./pages/admin/Orders/OrdersList";
import Booking from "./pages/admin/Orders/Booking";
import CustomerList from "./pages/admin/Customers/CustomerList";
import TeamList from "./pages/admin/Team/TeamList";
import BlogList from "./pages/admin/Blog/BlogList";
import BlogCategory from "./pages/admin/Blog/BlogCategory";
import ReviewsList from "./pages/admin/Reviews/ReviewsList";
import MyProfile from "./pages/admin/Profile/MyProfile";
import SettingsProfile from "./pages/admin/Settings/SettingsProfile";
import AdminLayout from "./layouts/AdminLayout";
import RequireAuth from "./pages/Login/RequiredAuth";
import type { JSX } from "react";

const protectedRoute = (path: string, element: JSX.Element) => ({
  path,
  element: <RequireAuth>{element}</RequireAuth>,
});

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about-us", element: <AboutUs /> },

        // Blog group

        { path: "blog", element: <ListBlog /> },
        { path: "blog/:id", element: <Blog /> },

        // Shop group
        {
          path: "shopping",
          element: <Shopping />,
        },
        { path: "books", element: <BookShop /> },
        { path: "books/:id", element: <BookDetail /> },
        { path: "courses", element: <CourseShop /> },
        { path: "courses/:id", element: <CourseDetail /> },

        // Coach group
        {
          path: "coach",
          element: <CoachList />,
        },
        { path: "coach/:id", element: <CoachDetail /> },
        { path: "booking", element: <BookingSection /> },
        { path: "contact", element: <Contact /> },
        { path: "login", element: <Login /> },
        { path: "forgotPassword", element: <ForgotPassword /> },
        { path: "paymentConfirm", element: <PaymentConfirm /> },
        protectedRoute("profile", <UserProfile />),

        // Fallback route
        { path: "*", element: <h1>404 - Page Not Found</h1> },
      ],
    },
    {
      path: "/",
      element: <AdminLayout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "products",
          children: [
            { path: "books", element: <BooksList /> },
            { path: "books-category", element: <BooksCategory /> },
            { path: "courses", element: <CoursesList /> },
            { path: "courses-category", element: <CoursesCategory /> },
          ],
        },
        {
          path: "orders",
          children: [
            {
              path: "list",
              element: <OrdersList />,
            },
            {
              path: "booking",
              element: <Booking />,
            },
          ],
        },

        {
          path: "customers",
          element: <CustomerList />,
        },
        {
          path: "team",
          element: <TeamList />,
        },
        {
          path: "blog",
          children: [
            {
              path: "list",
              element: <BlogList />,
            },
            {
              path: "category",
              element: <BlogCategory />,
            },
          ],
        },

        {
          path: "reviews",
          element: <ReviewsList />,
        },
        {
          path: "profile",
          element: <MyProfile />,
        },
        {
          path: "settings",
          element: <SettingsProfile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
