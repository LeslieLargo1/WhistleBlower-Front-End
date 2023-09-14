import React, { useState } from "react"
import { useAuth } from "../AuthContext/AuthContext"
import { useNavigate } from "react-router-dom"
import "./styles/style.css"

const CreateNewAdminForm = () => {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [message, setMessage] = useState(null)

  const handleCreateNewAdmin = async (event) => {
    event.preventDefault()
    setMessage(null)

    const username = event.target.username.value
    const password = event.target.password.value
    const email = event.target.email.value

    const myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${token}`)
    myHeaders.append("Content-Type", "application/json")

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ username, email, password }),
    }

    try {
    const response = await fetch(
      "https://whistle-blower-server.vercel.app/users/register-admin", 
      requestOptions
    );

      const contentType = response.headers.get("content-type")

      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json()
        if (data.success) {
          setMessage("New admin created successfully")
          navigate("/dashboard/admin")
        } else {
          setMessage("Failed to create new admin")
        }
      } else {
        const rawText = await response.text()
        console.log(`Unexpected response: ${rawText}`)
        setMessage(`Failed to create new admin: Unexpected server response`)
      }
    } catch (error) {
      setMessage(`Failed to create new admin: ${error.message}`)
    }
  }

  return (
    <div className="new-admin-form">
      <h1>Create New Admin</h1>
      <form onSubmit={handleCreateNewAdmin}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit" className="create-button">
          Create
        </button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  )
}

export default CreateNewAdminForm
