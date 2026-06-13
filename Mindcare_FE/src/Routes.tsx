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
import AdminRequireAuth from "./pages/Login/AdminRequireAuth";
import AdminLogin from "./pages/admin/AdminLogin/AdminLogin";
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
      path: "/admin",
      element: <AdminLogin />,
    },
    {
      path: "/",
      element: <AdminLayout />,
      children: [
        {
          path: "dashboard",
          element: <AdminRequireAuth><Dashboard /></AdminRequireAuth>,
        },
        {
          path: "products",
          children: [
            { path: "books", element: <AdminRequireAuth><BooksList /></AdminRequireAuth> },
            { path: "books-category", element: <AdminRequireAuth><BooksCategory /></AdminRequireAuth> },
            { path: "courses", element: <AdminRequireAuth><CoursesList /></AdminRequireAuth> },
            { path: "courses-category", element: <AdminRequireAuth><CoursesCategory /></AdminRequireAuth> },
          ],
        },
        {
          path: "orders",
          children: [
            {
              path: "list",
              element: <AdminRequireAuth><OrdersList /></AdminRequireAuth>,
            },
            {
              path: "booking",
              element: <AdminRequireAuth><Booking /></AdminRequireAuth>,
            },
          ],
        },

        {
          path: "customers",
          element: <AdminRequireAuth><CustomerList /></AdminRequireAuth>,
        },
        {
          path: "team",
          element: <AdminRequireAuth><TeamList /></AdminRequireAuth>,
        },
        {
          path: "blog",
          children: [
            {
              path: "list",
              element: <AdminRequireAuth><BlogList /></AdminRequireAuth>,
            },
            {
              path: "category",
              element: <AdminRequireAuth><BlogCategory /></AdminRequireAuth>,
            },
          ],
        },

        {
          path: "reviews",
          element: <AdminRequireAuth><ReviewsList /></AdminRequireAuth>,
        },
        {
          path: "profile",
          element: <AdminRequireAuth><MyProfile /></AdminRequireAuth>,
        },
        {
          path: "settings",
          element: <AdminRequireAuth><SettingsProfile /></AdminRequireAuth>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
