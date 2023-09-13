import React, { useState, useEffect } from "react"
import { useAuth } from "../AuthContext/AuthContext"

const ReplyComponent = ({ reportId }) => {
  const [replies, setReplies] = useState([])
  const [newReply, setNewReply] = useState("")
  const { token, userId } = useAuth()

  useEffect(() => {
    // Fetch existing replies for this reportId when the component mounts
    const fetchReplies = async () => {
      const headers = new Headers()
      headers.append("Authorization", `Bearer ${token}`)
      const response = await fetch(
        `https://whistle-blower-server.vercel.app/replies/${reportId}`,
        { headers }
      )
      const data = await response.json()
      setReplies(data.data || [])
    }
    fetchReplies()
  }, [reportId, token])

  const handleReplySubmit = async () => {
    const actualReportId = reportId.id; // Extracting the ID from the report object
  
    console.log(`actualReportId: ${actualReportId}, newReply: ${newReply}, userId: ${token}`);
  
    if (actualReportId && newReply && token) {
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);
      headers.append("Content-Type", "application/json");
  
      const payload = JSON.stringify({
        reportId: actualReportId, // using the actualReportId
        text: newReply,
      });
  
      console.log(`Request Body: ${payload}`);
  
      try {
        const response = await fetch('https://whistle-blower-server.vercel.app/replies/create', {
          method: 'POST',
          headers,
          body: payload,
        });
  
        if (response.ok) {
          const data = await response.json();
          setNewReply('');
          setReplies([...replies, data.data]);
        } else {
          console.error(`Failed to submit reply: ${response.status}`);
        }
      } catch (error) {
        console.error(`Failed to submit reply: ${error}`);
      }
    } else {
      console.error("Missing required fields");
    }
  };
  


  useEffect(() => {
    // Fetch existing replies for this reportId when the component mounts
    const fetchReplies = async () => {
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);
      const actualReportId = reportId.id;  // Extract the ID
      try {
        const response = await fetch(`https://whistle-blower-server.vercel.app/replies/${actualReportId}`, { headers });
        const data = await response.json();
        if (response.ok) {
          setReplies(data.data || []);
        } else {
          console.error(`Failed to fetch replies: ${response.status}`);
        }
      } catch (error) {
        console.error(`Failed to fetch replies: ${error}`);
      }
    };
    fetchReplies();
  }, [reportId, token]);
  
  
  
  return (
    <div className="reply-section">
      <h4>Replies</h4>
      {replies.map((reply, index) => (
        <div key={index} className="reply-item">
          {reply.text}
        </div>
      ))}
      <textarea
        value={newReply}
        onChange={(e) => setNewReply(e.target.value)}
        placeholder="Write your reply..."
      />
      <button onClick={handleReplySubmit}>Submit Reply</button>
    </div>
  )
}

export default ReplyComponent
