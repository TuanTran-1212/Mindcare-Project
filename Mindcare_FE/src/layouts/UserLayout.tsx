import { Outlet } from "react-router-dom";

//layout
import Footer from "../components/User/layouts/Footer";
import SmoothScroll from "../utilis/SmoothScroll";
import GoToTopButton from "../components/User/layouts/GotoTopButton";
import NavBar from "../components/User/layouts/Navbar";
import { CartProvider } from "../utilis/cart/CartProvider";

import "../assets/css/styles.css";
import "../assets/css/CartSideBar.css";
import "../components/User/common/itemList/ItemList.css";
import '../assets/css/aboutUs.css';
import '../assets/css/blog.css';
import '../assets/css/blog-detail.css';
import '../assets/css/shopping.css';
import '../assets/css/book-detail.css';
import '../assets/css/course-detail.css';
import '../assets/css/coach.css';
import '../assets/css/coach-detail.css';
import '../assets/css/contact.css';
import '../assets/css/login.css';
import '../assets/css/profile.css';
import '../assets/css/paymentConfirm.css';
import '../assets/css/booking.css';



function UserLayout() {
  
  return (
    <>
      
        <CartProvider>
          <SmoothScroll />
          <NavBar />
          <main>
            <Outlet />
          </main>

          <Footer />

          <GoToTopButton />
        </CartProvider>
      
    </>
  );
}

export default UserLayout;
