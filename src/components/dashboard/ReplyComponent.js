import React, { useState, useEffect } from "react"
import { useAuth } from "../AuthContext/AuthContext"
import {
  FaEdit,
  FaTrash,
  FaPaperPlane,
  FaUserAstronaut,
  FaUserNinja,
  FaUser,
} from "react-icons/fa"
import "./styles/style.css"

const ReplyComponent = ({ reportId }) => {
  const [replies, setReplies] = useState([])
  const { token, userId, username, userRole } = useAuth()
  const [newReply, setNewReply] = useState("")
  const [replyIdToEditOrDelete, setReplyIdToEditOrDelete] = useState("")
  let lastDate = null

  useEffect(() => {
    const storedReplies = localStorage.getItem(`replies_${reportId.id}`)
    if (storedReplies) {
      setReplies(JSON.parse(storedReplies))
    } else {
      fetchReplies()
    }
  }, [reportId, token])

  const fetchReplies = async () => {
    const headers = new Headers()
    headers.append("Authorization", `Bearer ${token}`)
    const response = await fetch(
      `https://whistle-blower-server.vercel.app/replies/${reportId.id}`,
      { headers }
    )
    const data = await response.json()
    const fetchedReplies = data.data || []
    localStorage.setItem(
      `replies_${reportId.id}`,
      JSON.stringify(fetchedReplies)
    )
    setReplies(fetchedReplies)
  }

  const handleReplySubmit = async () => {
    //console.log(
    //  `Report ID: ${reportId.id}, New Reply: ${newReply}, Token: ${token}, User ID: ${userId} Username: ${username} Role: ${userRole}`
    //)

    if (reportId.id && newReply && token && userId) {
      const headers = new Headers()
      headers.append("Authorization", `Bearer ${token}`)
      headers.append("Content-Type", "application/json")

      const payload = {
        report_id: reportId.id,
        user_id: userId,
        text: newReply,
        username: username,
        role: userRole,
      }

      //console.log("Payload before sending:", JSON.stringify(payload))

      try {
        const requestOptions = {
          method: "POST",
          headers: headers,
          body: JSON.stringify(payload),
          redirect: "follow",
        }

        const response = await fetch(
          "https://whistle-blower-server.vercel.app/replies/create",
          requestOptions
        )
        const result = await response.json()

        if (response.ok) {
          setNewReply("")
          const updatedReplies = [...replies, result.data]
          localStorage.setItem(
            `replies_${reportId.id}`,
            JSON.stringify(updatedReplies)
          )
          setReplies(updatedReplies)
        } else {
          console.error(
            `Failed to submit reply: ${response.status}, ${JSON.stringify(
              result
            )}`
          )
        }
      } catch (error) {
        console.error(`Failed to submit reply: ${error}`)
      }
    } else {
      console.error("Missing required fields")
    }
  }

  const editReply = async () => {
    const headers = new Headers()
    headers.append("Authorization", `Bearer ${token}`)
    headers.append("Content-Type", "application/json")

    const response = await fetch(
      `https://whistle-blower-server.vercel.app/replies/${replyIdToEditOrDelete}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify({ text: newReply }),
      }
    )

    if (response.ok) {
      alert("Reply edited successfully")
      fetchReplies()
    } else {
      alert("Failed to edit reply")
    }
  }

  const deleteReply = async () => {
    const headers = new Headers()
    headers.append("Authorization", `Bearer ${token}`)

    const response = await fetch(
      `https://whistle-blower-server.vercel.app/replies/${replyIdToEditOrDelete}`,
      {
        method: "DELETE",
        headers,
      }
    )

    if (response.ok) {
      alert("Reply deleted successfully")
      fetchReplies()
    } else {
      alert("Failed to delete reply")
    }
  }

  return (
    <div className="reply-section">
      {/*<h4>Replies</h4>*/}
      {replies.map((reply, index) => {
        const date = new Date(reply.created_at)
        const displayDate = date.toDateString()
        const replyUsername = reply.username
        const replyRole = reply.role
        //const displayTime = date.toLocaleTimeString("en-US", {
        //  hour: "2-digit",
        //  minute: "2-digit",
        //})
        //console.log("Full reply object:", reply)

        const showDate = lastDate !== displayDate
        lastDate = displayDate

        return (
          <div
            key={index}
            className={`reply-item ${
              userId === reply.user_id ? "my-reply" : "other-reply"
            } ${replyRole === "Admin" ? "admin-reply" : "client-reply"}`}
          >
            {showDate && <div className="reply-date">{displayDate}</div>}
            <div className="reply-content">
              <span className="reply-author-time">
                {replyRole === "Admin" ? (
                  <FaUserAstronaut size={18} title="Admin" />
                ) : replyRole === "Client" ? (
                  <FaUserNinja size={18} title="Client" />
                ) : (
                  <FaUser size={18} title="Unknown" />
                )}
                <span className="reply-author">
                  {replyUsername ? replyUsername : userRole}:
                </span>
              </span>
              <span className="reply-text">{reply.text}</span>
            </div>
            <div className="reply-actions">
              {userId === reply.user_id && (
                <>
                  <button onClick={() => setReplyIdToEditOrDelete(reply.id)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => deleteReply(reply.id)}>
                    <FaTrash />
                  </button>
                </>
              )}
            </div>
          </div>
        )
      })}

      <div className="reply-input">
        <span>
          {" "}
          {userRole === "Admin" ? (
            <FaUserAstronaut size={18} title="Admin" />
          ) : userRole === "Client" ? (
            <FaUserNinja size={18} title="Client" />
          ) : (
            <FaUser size={18} title="Unknown" />
          )}{" "}
        </span>
        <textarea
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Write your reply..."
        />
        <button onClick={handleReplySubmit}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  )
}

export default ReplyComponent
