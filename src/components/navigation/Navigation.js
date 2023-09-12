import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./styles/style.css"
import { useAuth } from "../AuthContext/AuthContext"

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const role = localStorage.getItem("role")
  const { token, setToken } = useAuth()
  const isAdmin = role === "admin"
  const isLoggedIn = Boolean(token)

  const navigate = useNavigate()

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen)
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem("role")
    navigate("/")
  }

  return (
    <nav className="nav-container">
      <div className="logo-container"></div>
      <div className={`links ${menuOpen ? "open" : ""}`}>
        <Link className="nav-link" to="/">
          Home
        </Link>
        {isLoggedIn ? (
          <>
            {isAdmin ? (
              <>
                <Link className="nav-link" to="/dashboard/admin">
                  Admin Dashboard
                </Link>
                <Link className="nav-link" to="/profile/admin">
                  Profile
                </Link>
                <Link className="nav-link" to="/create-new-admin">
                  Create New Admin
                </Link>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/dashboard/client">
                  Dashboard
                </Link>
                <Link className="nav-link" to="/report-form">
                  New Report
                </Link>
                <Link className="nav-link" to="/profile/client">
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
            <Link className="nav-link" to="/about">
              About
            </Link>
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
