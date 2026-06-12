import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { images } from "../../../assets/images";

interface SidebarProps {
  collapsed: boolean;
}

interface SubItem {
  label: string;
  path: string;
}

interface NavItemDef {
  label: string;
  icon: string;
  attribute: string[];
  path?: string;
  submenuId?: string;
  children?: SubItem[];
}

const NAV_ITEMS: NavItemDef[] = [
  {
    label: "Dashboard",
    icon: "fas fa-tachometer-alt",
    path: "/dashboard",
    attribute: [],
  },
  {
    label: "Product",
    icon: "fas fa-box",
    submenuId: "product",
    attribute: ["collapse", "#product-menu"],
    children: [
      { label: "Books List", path: "/products/books" },
      { label: "Books Category", path: "/products/books-category" },
      { label: "Courses List", path: "/products/courses" },
      { label: "Courses Category", path: "/products/courses-category" },
    ],
  },
  {
    label: "Order",
    icon: "fas fa-shopping-cart",
    submenuId: "order",
    attribute: ["collapse", "#product-menu"],
    children: [
      { label: "Orders List", path: "/orders/list" },
      { label: "Booking", path: "/orders/booking" },
    ],
  },
  {
    label: "Customer",
    icon: "fas fa-users",
    path: "/customers",
    attribute: [],
  },
  { label: "Team", icon: "fas fa-users", path: "/team", attribute: [] },
  {
    label: "Blog",
    icon: "fas fa-blog",
    submenuId: "blog",
    attribute: ["collapse", "#product-menu"],
    children: [
      { label: "Blog List", path: "/blog/list" },
      { label: "Blog Category", path: "/blog/category" },
    ],
  },
  { label: "Review", icon: "fas fa-star", path: "/reviews", attribute: [] },
];

const Sidebar = ({ collapsed }: SidebarProps) => {
  const location = useLocation();

  // Determine which submenus should be open initially
  const getInitialOpen = (): Record<string, boolean> => {
    const open: Record<string, boolean> = {};
    NAV_ITEMS.forEach((item) => {
      if (item.children) {
        const isActive = item.children.some((c) =>
          location.pathname.startsWith(c.path),
        );
        if (isActive && item.submenuId) open[item.submenuId] = true;
      }
    });
    return open;
  };

  const [openMenus, setOpenMenus] =
    useState<Record<string, boolean>>(getInitialOpen);

  const toggleMenu = (id: string) => {
    if (collapsed) return;
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isParentActive = (item: NavItemDef): boolean => {
    if (!item.children) return false;
    return item.children.some((c) => location.pathname.startsWith(c.path));
  };

  return (
    <nav className={`sidebar${collapsed ? " collapsed" : ""}`} id="sidebar">
      {/* Logo */}
      <div className="sidebar-logo bg-dark text-center py-3 border-bottom">
        <NavLink to="/dashboard">
          <img src={collapsed ? images.logo.lo2 : images.logo.lo1} alt="Logo" />
        </NavLink>
      </div>

      <ul className="nav flex-column" style={{ padding: 0, margin: 0 }}>
        {/* Search */}
        <li className="nav-item sidebar-search-wrapper">
          <div className="sidebar-search-icon-wrapper">
            <i className="fas fa-search"></i>
          </div>
          <div className="sidebar-search-dropdown">
            <input
              type="text"
              className="sidebar-search-input"
              placeholder="Search..."
            />
          </div>
        </li>

        {/* Nav Items */}
        {NAV_ITEMS.map((item) => {
          if (item.path && !item.children) {
            // Simple nav link
            return (
              <li className="nav-item" key={item.label}>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link${isActive ? " active" : ""}`
                  }
                  to={item.path}
                >
                  <i className={item.icon}></i>
                  <span> {item.label}</span>
                </NavLink>
              </li>
            );
          }

          // Nav with submenu
          const isOpen = item.submenuId ? openMenus[item.submenuId] : false;
          const parentActive = isParentActive(item);

          return (
            <li className="nav-item" key={item.label}>
              <button
                className={`nav-link${parentActive ? " active" : ""}
                `}
                data-bs-toggle="collapse"
                data-bs-target={`#${item.submenuId}`}
                onClick={() => item.submenuId && toggleMenu(item.submenuId)}
              >
                <i className={item.icon}></i>
                <span> {item.label}</span>
                <i
                  className={`fas fa-chevron-down arrow-icon${isOpen ? " fa-rotate-180" : ""}`}
                  style={{ transition: "transform 0.2s" }}
                ></i>
              </button>

              {/* Submenu */}
              <ul
                style={{ padding: 0, margin: 0 }}
                className={`collapse ps-4`}
                id={item.submenuId}
              >
                {item.children?.map((child) => (
                  <li key={child.path}>
                    <NavLink
                      className={({ isActive }) =>
                        `nav-link-child${isActive ? " active" : ""}`
                      }
                      to={child.path}
                    >
                      <span>{child.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
