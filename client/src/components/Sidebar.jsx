import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";
import HRSLogo from "../assets/HRSLogo.jpg";

const Sidebar = () => {
  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: "dashboard" },
    { to: "/rooms", label: "Rooms & Tables", icon: "rooms" },
    { to: "/bookings", label: "Bookings", icon: "bookings" },
    { to: "/pos", label: "POS", icon: "pos" },
    { to: "/reports", label: "Reports", icon: "reports" },
  ];

  const renderIcon = (name) => {
    switch (name) {
      case "dashboard":
        return (
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="3"
              y="3"
              width="8"
              height="8"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <rect
              x="13"
              y="3"
              width="8"
              height="5"
              rx="1.2"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <rect
              x="13"
              y="10"
              width="8"
              height="11"
              rx="1.2"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <rect
              x="3"
              y="13"
              width="8"
              height="5"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
        );
      case "rooms":
        return (
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 7h18v10H3z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <path
              d="M7 11v4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M12 11v4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M17 11v4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        );
      case "bookings":
        return (
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="3"
              y="5"
              width="18"
              height="16"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M8 3v4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M16 3v4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M3 11h18"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        );
      case "pos":
        return (
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="10"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M7 17h10"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="12" cy="8" r="1" fill="currentColor" />
          </svg>
        );
      case "reports":
        return (
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 21h18"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <rect
              x="4"
              y="6"
              width="4"
              height="9"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <rect
              x="10"
              y="2"
              width="4"
              height="13"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <rect
              x="16"
              y="11"
              width="4"
              height="5"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <aside className="app-sidebar" aria-label="Primary navigation">
      <div className="sidebar-top">
        <div className="brand">
          <img src={HRSLogo} alt="HRS logo" className="brand-logo" />
          <div className="brand-text">
            <strong>BPC Hotel &amp; Restaurant</strong>
            <small>Booking &amp; POS System</small>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">{renderIcon(item.icon)}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          className="logout-btn"
          type="button"
          onClick={() => {
            window.location.href = "/logout";
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 17l5-5-5-5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 12H9"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13 19H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h7"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
