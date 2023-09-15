import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/style.css";
import { useAuth } from "../AuthContext/AuthContext";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token, setToken } = useAuth();
  const userRole = sessionStorage.getItem("role");
  const isAdmin = userRole === "admin";
  const isLoggedIn = Boolean(token);

  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = () => {
    // Close the menu when a menu item is clicked
    setMenuOpen(false);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="nav-container">
      <div className="logo-container"></div>
      <div className={`links ${menuOpen ? "open" : ""}`}>
        <Link
          className="nav-link"
          to="/"
          onClick={() => {
            handleMenuItemClick();
          }}
        >
          Homepage
        </Link>
        <Link
          className="nav-link"
          to="/about"
          onClick={() => {
            handleMenuItemClick();
          }}
        >
          About
        </Link>
        {isLoggedIn ? (
          <>
            {isAdmin ? (
              <>
                <Link
                  className="nav-link"
                  to="/dashboard/admin"
                  onClick={() => {
                    handleMenuItemClick();
                  }}
                >
                  Admin Dashboard
                </Link>
                <Link
                  className="nav-link"
                  to="/profile/admin"
                  onClick={() => {
                    handleMenuItemClick();
                  }}
                >
                  Profile
                </Link>
                <Link
                  className="nav-link"
                  to="/create-new-admin"
                  onClick={() => {
                    handleMenuItemClick();
                  }}
                >
                  Create New Admin
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="nav-link"
                  to="/dashboard/client"
                  onClick={() => {
                    handleMenuItemClick();
                  }}
                >
                  Dashboard
                </Link>
                <Link
                  className="nav-link"
                  to="/report-form"
                  onClick={() => {
                    handleMenuItemClick();
                  }}
                >
                  New Report
                </Link>
                <Link
                  className="nav-link"
                  to="/profile/client"
                  onClick={() => {
                    handleMenuItemClick();
                  }}
                >
                  Profile
                </Link>
              </>
            )}
            <button className="nav-link" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              className="nav-link"
              to="/login"
              onClick={() => {
                handleMenuItemClick();
              }}
            >
              Login
            </Link>
            <Link
              className="nav-link"
              to="/register"
              onClick={() => {
                handleMenuItemClick();
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>
      <div
        className={`menu-icon ${menuOpen ? "toggle" : ""}`}
        onClick={handleMenuToggle}
      >
        <div className={`menu-bar ${menuOpen ? "toggle" : ""}`}></div>
        <div className={`menu-bar ${menuOpen ? "toggle" : ""}`}></div>
        <div className={`menu-bar ${menuOpen ? "toggle" : ""}`}></div>
      </div>
    </nav>
  );
};

export default Navigation;
