// src/components/Header.tsx
import React, { useState, useEffect, useCallback } from "react";
import { NavLink, Link } from "react-router-dom";
// import "../../../assets/css/styles.css";
import { images } from "../../../assets/images";
import CartSidebar from "./CartSideBar";
import { useShoppingCart } from "../../../utilis/cart/useCart"; 

const Header: React.FC = () => {
  const { totalItems, openCart } = useShoppingCart(); // cùng context → đúng số

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openMobileMenu = useCallback(() => {
    setIsMenuOpen(true);
    document.body.classList.add("menu-open");
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMenuOpen(false);
    setOpenSubmenu(null);
    document.body.classList.remove("menu-open");
  }, []);

  const closeSearch = useCallback(() => setIsSearchActive(false), []);

  const handleSubmenuClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, submenuKey: string) => {
      if (!isMenuOpen) return;
      e.preventDefault();
      setOpenSubmenu((prev) => (prev === submenuKey ? null : submenuKey));
    },
    [isMenuOpen]
  );

  const handleRegularLinkClick = useCallback(() => {
    if (isMenuOpen) closeMobileMenu();
  }, [isMenuOpen, closeMobileMenu]);

  return ( 
    <>
      <header className="header-User">
        <div className={`header-top ${isScrolled ? "scrolled" : ""}`}>
          <div className="header-container">
            {/* Mobile Menu Button */}
            <div className="mobile-buttons col-1">
              <button className="mobile-menu-btn" onClick={openMobileMenu} aria-label="Open menu">
                <i className="fas fa-bars" />
              </button>
            </div>

            {/* Logo */}
            <div className="logo col-md-2 col-sm-3 col-4">
              <Link to="/" onClick={handleRegularLinkClick}>
                <img src={images.logo.lo1} alt="Logo" />
              </Link>
            </div>

            {/* Nav */}
            <nav className="menu col-lg-5">
              <ul className={`main-menu ${isMenuOpen ? "active" : ""}`}>
                <li className="mobile-menu-header-li">
                  <button className="mobile-close-btn" onClick={closeMobileMenu} aria-label="Close menu">
                    <i className="fas fa-times" />
                  </button>
                </li>
                <li><NavLink to="/" onClick={handleRegularLinkClick}>Home</NavLink></li>
                <li><NavLink to="/about-us" onClick={handleRegularLinkClick}>About Us</NavLink></li>
                <li className={`has-child ${openSubmenu === "shop" ? "open" : ""}`}>
                  <Link to="/Shopping" className="has-child-item" onClick={(e) => handleSubmenuClick(e, "shop")}>
                    Shop <i className="fas fa-chevron-down" />
                  </Link>
                  <ul className="sub-menu">
                    <li><NavLink to="/books" onClick={handleRegularLinkClick}>Books</NavLink></li>
                    <li><NavLink to="/courses" onClick={handleRegularLinkClick}>E-Learning</NavLink></li>
                  </ul>
                </li>
                <li><NavLink to="/blog" onClick={handleRegularLinkClick}>Blog</NavLink></li>
                <li><NavLink to="/Coach" onClick={handleRegularLinkClick}>Coaching</NavLink></li>
                <li><NavLink to="/Contact" onClick={handleRegularLinkClick}>Contact</NavLink></li>
              </ul>
            </nav>

            {/* Desktop Search */}
            <div className="search-bar col-3">
              <input type="text" placeholder="- Search for books/course..." className="search-input" id="desktop-input" />
              <button className="search-btn" aria-label="Search">
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx={11} cy={11} r={8} /><path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </div>

            {/* Mobile Search Toggle */}
            <div className="mobile-buttons search col col-sm-1">
              <button className="search-btn search-toggle" aria-label="Search" onClick={() => setIsSearchActive(prev => !prev)}>
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx={11} cy={11} r={8} /><path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </div>

            {/* Cart Icon - badge cập nhật realtime từ context */}
            <div className="cart-toggle" role="button" tabIndex={0} onClick={openCart} onKeyDown={(e) => e.key === "Enter" && openCart()}>
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx={9} cy={21} r={1} />
                <circle cx={20} cy={21} r={1} />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {totalItems > 0 && (
                <span className="cart-count">{totalItems}</span>
              )}
            </div>

            {/* Login */}
            <div className="auth-buttons col-xl-1 col-2">
              <NavLink to="/Login" className="btn-login" onClick={handleRegularLinkClick}>
                <i className="fa-solid fa-person" />
              </NavLink>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className={`header-bottom ${isScrolled ? "scrolled" : ""} ${isSearchActive ? "active" : ""}`}>
          <div className="search-container">
            <div className="search-bar">
              <input type="text" placeholder="- Search for books/course..." className="search-input" id="mobile-input" />
              <button className="search-btn" aria-label="Search">
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx={11} cy={11} r={8} /><path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={`mobile-menu-overlay ${isMenuOpen ? "active" : ""}`} onClick={closeMobileMenu} aria-hidden="true" />
      <div className={`search-overlay ${isSearchActive ? "active" : ""}`} onClick={closeSearch} />

      {/* CartSidebar không cần props - tự lấy state từ context */}
      <CartSidebar />
    </>
  );
};

export default Header;