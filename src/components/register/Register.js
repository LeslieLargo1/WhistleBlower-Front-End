import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../AuthContext/AuthContext"
import "./styles/style.css"
import Accordion from "./Accordion"

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const navigate = useNavigate()
  const { setToken } = useAuth()
  const [feedbackMessage, setFeedbackMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFeedbackMessage("Registering...")

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }

    try {
      const response = await fetch(
        "https://whistle-blower-server.vercel.app/register",
        requestOptions
      )

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          console.log("Registration successful")
          setToken(data.token)
          setFeedbackMessage("Registration successful! Redirecting...")
          if (data.role === "admin") {
            navigate("/dashboard/admin")
          } else {
            navigate("/dashboard/client")
          }
        } else {
          setFeedbackMessage(`Registration failed: ${data.message}`)
          console.log("Registration failed:", data.message)
        }
      } else {
        setFeedbackMessage(
          `Server returned ${response.status}: ${response.statusText}`
        )
      }
    } catch (error) {
      setFeedbackMessage("An error occurred during registration.")
      console.error("Registration error:", error)
    }
  }

  const bglink =
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"

  return (
    <section className="registerBody" style={{ display: "flex" }}>
      <div
        className="registerLeft"
        style={{
          backgroundImage: `url(${bglink})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "50%",
          height: "100vh",
        }}
      >
        <Accordion />
      </div>
      <div className="register-right" style={{ width: "50%", padding: "2em" }}>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="userSection">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="emailSection">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="passwordSection">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="button3">
            <button type="submit">Register</button>
          </div>
        </form>
        <div className="feedbackMessage">{feedbackMessage}</div>
      </div>
    </section>
  )
}

export default Register
