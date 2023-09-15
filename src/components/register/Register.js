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
        "https://whistle-blower-server.vercel.app/users/register",
        requestOptions
      )
      const data = await response.json()

      if (response.ok) {
        if (data.success) {
          console.log("Registration successful")
          setToken(data.token)
          setFeedbackMessage("Registration successful! Redirecting...")
          if (data.role === "admin") {
            navigate("/dashboard/admin")
          } else {
            navigate("/dashboard/client")
          }
        }
      } else {
        switch (response.status) {
          case 400:
            setFeedbackMessage(
              "Invalid data. Please fill out all fields correctly."
            )
            break
          case 409:
            setFeedbackMessage("Username or email already exists.")
            break
          case 500:
            setFeedbackMessage("Internal Server Error. Please try again later.")
            break
          default:
            setFeedbackMessage(
              `Server returned ${response.status}: ${response.statusText}`
            )
        }
      }
    } catch (error) {
      setFeedbackMessage("An error occurred during registration.")
      console.error("Registration error:", error)
    }
  }

  return (
    <section className="registerBody">
      <div className="registerLeft">
        <Accordion />
      </div>
      <div className="register-right">
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
              className="inputText"
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
          <button type="submit">Register</button>
        </form>
        <div className="redirect-to-login">
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className="login">
              {" "}
              Log in
            </span>
          </p>
        </div>
        <div className="feedbackMessage">{feedbackMessage}</div>
      </div>
    </section>
  )
}

export default Register
