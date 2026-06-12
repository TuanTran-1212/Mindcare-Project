import React from "react";
import { NavLink } from "react-router-dom";
import { images } from "../../../assets/images";

interface HeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Header = ({ collapsed, onToggle }: HeaderProps) => {
  return (
    <header
      className={`header${collapsed ? " collapsed" : ""} header-expanded position-fixed`}
    >
      <div className="container-fluid h-100 d-flex align-items-center">
        <button
          className="btn btn-outline-secondary"
          id="sidebar-toggle"
          onClick={onToggle}
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="d-flex align-items-center ms-auto">
          {/* Notifications */}
          <div className="dropdown me-3">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i className="fas fa-bell"></i>
              <span className="badge bg-danger">3</span> {/** */}
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Notification 1
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Notification 2
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Notification 3
                </a>
              </li>
            </ul>
          </div>

          {/* User dropdown */}
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              <img
                src={images.team.member1}
                alt="User"
                className="user-avatar"
              />
              User Admin
            </button>
            <ul className="dropdown-menu">
              <li>
                <NavLink className="dropdown-item" to="/profile">
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to="/settings">
                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to="/">
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
