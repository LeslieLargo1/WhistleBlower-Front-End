import React, { useState } from "react"
import "./styles/style.css"
import { useAuth } from "../AuthContext/AuthContext"
import Accordion from "../register/Accordion"
import { useNavigate } from "react-router"

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
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
    e.preventDefault();
    setFeedbackMessage("Logging in...");
  
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
  
    try {
      const response = await fetch(
        "https://whistle-blower-server.vercel.app/users/login",
        requestOptions
      );
      const data = await response.json();
      console.log("Server Response: ", response);
      console.log("Server Data: ", data);
  
      if (response.ok) {
        if (data.token) {  
          console.log("Login successful");
          setToken(data.token);
          localStorage.setItem("role", data.user.role);
          setFeedbackMessage("Login successful! Redirecting...");
          
          const userRole = data.user?.role || 'client';  
  
          if (userRole === "admin") {
            navigate("/dashboard/admin");
          } else {
            navigate("/dashboard/client");
          }
        } else {
          setFeedbackMessage(`Login failed: ${data.message || "Unknown error"}`);
          console.log("Login failed:", data.message);
        }
      } else {
        setFeedbackMessage(`Server returned ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      setFeedbackMessage("An error occurred during login.");
      console.error("Login error:", error);
    }
  };
  

  return (
    <section className="registerBody">
      <div className="registerLeft">
        <Accordion />
      </div>
      <div className="register-right">
        <h1>Login</h1>
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
          <button type="submit">Login</button>
        </form>
        <div className="redirect-to-login">
          <p>
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")} className="register">
              Register
            </span>
          </p>
        </div>{" "}
        <div className="feedbackMessage">{feedbackMessage}</div>
      </div>{" "}
    </section>
  )
}

export default Login
