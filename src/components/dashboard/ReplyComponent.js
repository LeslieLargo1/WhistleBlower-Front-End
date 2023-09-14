import React, { useState, useEffect } from "react"
import { useAuth } from "../AuthContext/AuthContext"

const ReplyComponent = ({ reportId }) => {
  const [replies, setReplies] = useState([])
  const [newReply, setNewReply] = useState("")
  const [replyIdToEditOrDelete, setReplyIdToEditOrDelete] = useState("")
  const { token, userId } = useAuth()

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
    console.log(`Report ID: ${reportId.id}, New Reply: ${newReply}, Token: ${token}, User ID: ${userId}`);


    if (reportId.id && newReply && token && userId) {
      const headers = new Headers()
      headers.append("Authorization", `Bearer ${token}`)
      headers.append("Content-Type", "application/json")

      const payload = {
        reportId: reportId.id,
        userId: userId,
        text: newReply,
      }

      console.log("Payload:", payload)

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

        if (response.status === 401) {
          console.error("Authentication failed. Invalid token.")
        }
        if (response.ok) {
          setNewReply("")
          setReplies([...replies, result.data])
        } else {
          console.error(`Failed to submit reply: ${response.status}`)
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
      {replies.map((reply, index) => (
        <div key={index} className="reply-item">
          {reply.text}
          <button onClick={() => setReplyIdToEditOrDelete(reply.id)}>
            Select
          </button>
        </div>
      ))}
      <textarea
        value={newReply}
        onChange={(e) => setNewReply(e.target.value)}
        placeholder="Write your reply..."
      />
      <button onClick={handleReplySubmit}>Submit Reply</button>
      <button onClick={editReply}>Edit Selected Reply</button>
      <button onClick={deleteReply}>Delete Selected Reply</button>
    </div>
  )
}

export default ReplyComponent
