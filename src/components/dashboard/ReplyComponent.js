import React, { useState, useEffect } from "react"
import { useAuth } from "../AuthContext/AuthContext"
import { FaEdit, FaTrash, FaPaperPlane } from "react-icons/fa"
import "./styles/style.css"
const ReplyComponent = ({ reportId }) => {
  const [replies, setReplies] = useState([])
  const [newReply, setNewReply] = useState("")
  const [replyIdToEditOrDelete, setReplyIdToEditOrDelete] = useState("")
  const { token, userId } = useAuth()
  let lastDate = null

  const fetchReplies = async () => {
    const headers = new Headers()
    headers.append("Authorization", `Bearer ${token}`)
    const response = await fetch(
      `https://whistle-blower-server.vercel.app/replies/${reportId.id}`,
      { headers }
    )

    const data = await response.json()
    setReplies(data.data || [])
  }

  useEffect(() => {
    fetchReplies()
  }, [reportId, token])

  const handleReplySubmit = async () => {
    console.log(
      `Report ID: ${reportId.id}, New Reply: ${newReply}, Token: ${token}, User ID: ${userId}`
    )

    if (reportId.id && newReply && token && userId) {
      const headers = new Headers()
      headers.append("Authorization", `Bearer ${token}`)
      headers.append("Content-Type", "application/json")

      const payload = {
        report_id: reportId.id,
        user_id: userId,
        text: newReply,
      }

      console.log("Payload before sending:", JSON.stringify(payload))

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
          setReplies([...replies, result.data])
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
      <h4>Replies</h4>
      {replies.map((reply, index) => {
        const date = new Date(reply.created_at)
        const displayDate = date.toDateString()
        const displayTime = date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
        const showDate = lastDate !== displayDate
        lastDate = displayDate

        return (
          <div
            key={index}
            className={`reply-item ${
              userId === reply.user_id ? "my-reply" : "other-reply"
            }`}
          >
            {showDate && <div className="reply-date">{displayDate}</div>}
            <div className="reply-content">
              <span className="reply-author-time">
                {reply.username}{" "}
                <span className="reply-time">({displayTime})</span>
              </span>
              : {reply.text}
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
        <span>{userId}: </span>
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
