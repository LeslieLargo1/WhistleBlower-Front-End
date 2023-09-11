import React from "react"
import { Link } from "react-router-dom"
import "./styles/style.css"
import { useState } from "react"

const Navigation = ({ isAdmin, isLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav className="nav-container">
      <div className="logo-container"></div>
      <div className={`links ${menuOpen ? "open" : ""}`}>
        <Link className="nav-link" to="/">
          Home
        </Link>
        {isLoggedIn ? (
          isAdmin ? (
            <>
              <Link className="nav-link" to="/dashboard/admin">
                Admin Dashboard
              </Link>
              {/* Additional Admin Links */}
            </>
          ) : (
            <>
              <Link className="nav-link" to="/dashboard/client">
                Client Dashboard
              </Link>
              <Link className="nav-link" to="/report-form">
                New Report
              </Link>
              {/* Additional Client Links */}
            </>
          )
        ) : (
          <>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link" to="/register">
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
  )
}

export default Navigation
