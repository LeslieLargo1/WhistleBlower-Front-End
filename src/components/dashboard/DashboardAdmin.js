import React, { useState, useEffect } from "react"
import "./styles/style.css"
import {
  FaInbox,
  FaFileAlt,
  FaDraft2Digital,
  FaFlag,
  FaEdit,
  FaReply,
  FaFilePdf,
  FaCalendarAlt,
  FaRegCheckCircle,
  FaTags,
  FaExclamationTriangle,
  FaSortAmountUp,
  FaSortAmountDown,
} from "react-icons/fa"

import { useAuth } from "../AuthContext/AuthContext"
import { useNavigate } from "react-router-dom"

const AdminDashboard = () => {
  const { token } = useAuth()
  const [reports, setReports] = useState([])
  const [sortField, setSortField] = useState("date")
  const [sortOrder, setSortOrder] = useState("asc")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchReports = async () => {
      const myHeaders = new Headers()
      myHeaders.append("Authorization", `Bearer ${token}`)

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      }

      try {
        const response = await fetch(
          "https://whistle-blower-server.vercel.app/reports/all",
          requestOptions
        )
        const data = await response.json()

        if (Array.isArray(data)) {
          setReports(data)
        } else {
          console.error("Data fetched is not an array:", data)
        }
      } catch (error) {
        console.error("Failed to fetch reports:", error)
      }
    }

    fetchReports()
  }, [token])

  useEffect(() => {
    const sortedReports = [...reports].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1
      return 0
    })

    setReports(sortedReports)
  }, [sortField, sortOrder, reports])

  const handleGeneratePdf = async (reportId) => {
    const myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${token}`)
    try {
      const response = await fetch(
        `https://whistle-blower-server.vercel.app/reports/${reportId}/pdf`,
        {
          method: "GET",
          headers: myHeaders,
        }
      )
      // Use pdfgeneratorapi logic here to generate PDF
      console.log(`PDF generated for report ${reportId}`)
    } catch (error) {
      console.error(`Failed to generate PDF for report ${reportId}:`, error)
    }
  }

  const handleReply = async (reportId) => {
    navigate(`/replies/create?reportId=${reportId}`)
  }

  const handlePriorityChange = async (reportId, newPriority) => {
    const myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${token}`)
    try {
      await fetch(
        `https://whistle-blower-server.vercel.app/reports/${reportId}/priority`,
        {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify({ priority: newPriority }),
        }
      )
      console.log(`Priority of report ${reportId} changed to ${newPriority}`)
    } catch (error) {
      console.error(`Failed to change priority for report ${reportId}:`, error)
    }
  }

  const handleStatusChange = async (reportId, newStatus) => {
    const myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${token}`)
    try {
      await fetch(
        `https://whistle-blower-server.vercel.app/reports/${reportId}/status`,
        {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify({ status: newStatus }),
        }
      )
      console.log(`Status of report ${reportId} changed to ${newStatus}`)
    } catch (error) {
      console.error(`Failed to change status for report ${reportId}:`, error)
    }
  }

  return (
    <div className="dashboard">
      <header className="header">
        <h1>Admin Dashboard</h1>
      </header>
      <div className="main">
        <aside className="sidebar">
          <ul className="menu">
            <li>
              <FaInbox size={18} /> Inbox
            </li>
            <li>
              <FaFileAlt size={18} /> Reports
            </li>
            <li>
              <FaDraft2Digital size={18} /> Drafts
            </li>
          </ul>
        </aside>
        <section className="content">
          <div className="sort-options">
            <label>Sort By: </label>
            <span onClick={() => setSortField("date")} title="Sort by Date">
              <FaCalendarAlt size={18} />
            </span>
            <span onClick={() => setSortField("status")} title="Sort by Status">
              <FaRegCheckCircle size={18} />
            </span>
            <span
              onClick={() => setSortField("category")}
              title="Sort by Category"
            >
              <FaTags size={18} />
            </span>
            <span
              onClick={() => setSortField("priority")}
              title="Sort by Priority"
            >
              <FaExclamationTriangle size={18} />
            </span>
            <label>Order: </label>
            <span onClick={() => setSortOrder("asc")} title="Ascending Order">
              <FaSortAmountUp size={18} />
            </span>
            <span onClick={() => setSortOrder("desc")} title="Descending Order">
              <FaSortAmountDown size={18} />
            </span>
          </div>
          <h2>Admin Inbox</h2>
          <table className="report-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.title}</td>
                  <td>{report.status}</td>
                  <td>{report.priority}</td>
                  <td>{report.date}</td>
                  <td>
                    <button onClick={() => handleGeneratePdf(report.id)}>
                      <FaFilePdf />
                    </button>
                    <button onClick={() => handleReply(report.id)}>
                      <FaReply />
                    </button>
                    <button
                      onClick={() => handlePriorityChange(report.id, "High")}
                    >
                      <FaFlag />
                    </button>
                    <button
                      onClick={() => handleStatusChange(report.id, "Open")}
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  )
}

export default AdminDashboard
