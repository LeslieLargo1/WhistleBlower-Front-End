import React, { useState } from "react"
import "./styles/style.css"

const ChangePassword = ({ token }) => {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [feedback, setFeedback] = useState("")

  const handleChangePassword = async () => {
    if (newPassword === confirmPassword) {
      const myHeaders = new Headers()
      myHeaders.append("Authorization", `Bearer ${token}`)
      myHeaders.append("Content-Type", "application/json")

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ newPassword }),
      }

      try {
        const response = await fetch(
          "https://whistle-blower-server.vercel.app/users/update-password",
          requestOptions
        )
        const data = await response.json()
        if (data.success) {
          setFeedback("Password successfully changed")
        } else {
          setFeedback("Failed to change password")
        }
      } catch (error) {
        setFeedback("An error occurred while changing the password")
        console.log("Error changing password:", error)
      }
    } else {
      setFeedback("Passwords do not match")
    }
  }

  return (
    <div className="change-password">
      <label>
        New Password:
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button onClick={handleChangePassword}>Change Password</button>
      {feedback && <div className="feedback">{feedback}</div>}
    </div>
  )
}

export default ChangePassword
