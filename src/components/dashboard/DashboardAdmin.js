import React, { useState, useEffect, useMemo } from "react"
import "./styles/style.css"
import ReplyComponent from "./ReplyComponent"
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
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa"

import { useAuth } from "../AuthContext/AuthContext"
import { useNavigate } from "react-router-dom"

const AdminDashboard = () => {
  const { token, userId } = useAuth()
  const [reports, setReports] = useState([])
  const [showDetailView, setShowDetailView] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [selectedReport, setSelectedReport] = useState(null)
  const [sortField, setSortField] = useState("date")
  const [sortOrder] = useState("asc")
  const [showReplyComponent, setShowReplyComponent] = useState(false)
  const navigate = useNavigate()
  const priorities = ["Low", "Medium", "High", "Resolved"]
  const statuses = ["Open", "Closed", "Resolved"]

  useEffect(() => {
    const fetchReports = async () => {
      const myHeaders = new Headers()
      myHeaders.append("Authorization", `Bearer ${token}`)

      try {
        const response = await fetch(
          "https://whistle-blower-server.vercel.app/reports/all",
          {
            method: "GET",
            headers: myHeaders,
          }
        )

        if (response.ok) {
          const data = await response.json()
          console.log("Received data:", data)

          if (Array.isArray(data) || Array.isArray(data.data)) {
            setReports(Array.isArray(data) ? data : data.data)
          } else if (data && data.message) {
            console.error(`Server message: ${data.message}`)
          } else {
            console.error("Data fetched is not an array:", data)
          }
        } else {
          console.error(`HTTP Error: ${response.status}`)
        }
      } catch (error) {
        console.error("Failed to fetch reports:", error)
      }
    }

    fetchReports()
  }, [token])

  const handleReportClick = (report, index) => {
    setSelectedReport(report)
    setCurrentIndex(index)
    setShowDetailView(true)
    markAsRead(report.id)
  }

  const markAsRead = async (reportId) => {
    // Logic to mark report as read by changing its status to 'opened'
    // You can use a fetch or axios call here to update the report status in the database
  }

  const navigateReport = (direction) => {
    let newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1
    if (newIndex >= 0 && newIndex < sortedReports.length) {
      setCurrentIndex(newIndex)
      setSelectedReport(sortedReports[newIndex])
    }
  }
  const sortedReports = useMemo(() => {
    return [...reports].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1
      return 0
    })
  }, [sortField, reports])

  const handleGeneratePdf = async (reportId) => {
    const myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${token}`)
    try {
      await fetch(
        `https://whistle-blower-server.vercel.app/reports/${reportId}/pdf`,
        {
          method: "GET",
          headers: myHeaders,
        }
      )
      //TODO- Use pdfgeneratorapi logic here to generate PDF
      console.log(`PDF generated for report ${reportId}`)
    } catch (error) {
      console.error(`Failed to generate PDF for report ${reportId}:`, error)
    }
  }

  const handleReply = () => {
    setShowReplyComponent(!showReplyComponent)
  }

  const getFlagColor = (priority, status) => {
    if (status === "Resolved") {
      return "green"
    }
    switch (priority) {
      case "High":
        return "red"
      case "Medium":
        return "orange"
      case "Low":
        return "yellow"
      default:
        return ""
    }
  }

  const handlePriorityChange = async (reportId, currentPriority) => {
    const currentPriorityIndex = priorities.indexOf(currentPriority)
    const nextPriorityIndex = (currentPriorityIndex + 1) % priorities.length
    const nextPriority = priorities[nextPriorityIndex]

    const myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${token}`)

    try {
      const response = await fetch(
        `https://whistle-blower-server.vercel.app/reports/${reportId}/priority`,
        {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify({ priority: nextPriority }),
        }
      )

      if (response.ok) {
        setReports((prevReports) =>
          prevReports.map((report) =>
            report.id === reportId
              ? { ...report, priority: nextPriority }
              : report
          )
        )
        console.log(`Priority of report ${reportId} changed to ${nextPriority}`)
      } else {
        console.error(
          `Failed to change priority for report ${reportId}: ${response.status}`
        )
      }
    } catch (error) {
      console.error(`Failed to change priority for report ${reportId}:`, error)
    }
  }

  const handleStatusChange = async (reportId, currentStatus) => {
    const currentStatusIndex = statuses.indexOf(currentStatus)
    const nextStatusIndex = (currentStatusIndex + 1) % statuses.length
    const nextStatus = statuses[nextStatusIndex]

    const myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${token}`)

    try {
      const response = await fetch(
        `https://whistle-blower-server.vercel.app/reports/${reportId}/status`,
        {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify({ status: nextStatus }),
        }
      )

      if (response.ok) {
        setReports((prevReports) =>
          prevReports.map((report) =>
            report.id === reportId ? { ...report, status: nextStatus } : report
          )
        )
        console.log(`Status of report ${reportId} changed to ${nextStatus}`)
      } else {
        console.error(
          `Failed to change status for report ${reportId}: ${response.status}`
        )
      }
    } catch (error) {
      console.error(`Failed to change status for report ${reportId}:`, error)
    }
  }

  const handleCategoryCreation = async (newCategory) => {
    const myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${token}`)
    try {
      await fetch(
        `https://whistle-blower-server.vercel.app/categories/create`,
        {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({ status: newCategory }),
        }
      )
      console.log(`Created new category!`)
    } catch (error) {
      console.error(`Failed to create new categoty!`, error)
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
          <div className="buttons-admin">
            <button onClick={() => navigate("/create-new-admin")}>
              Create New Admin
            </button>
            <button onClick={handleCategoryCreation}>
              Create new category
            </button>
          </div>
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
            {/*<label>Order: </label>
            <span onClick={() => setSortOrder("asc")} title="Ascending Order">
              <FaSortAmountUp size={18} />
            </span>
            <span onClick={() => setSortOrder("desc")} title="Descending Order">
              <FaSortAmountDown size={18} />
            </span>*/}
          </div>
          <h2>Admin Inbox</h2>
          <div className="report-section">
            <table className={`report-table ${showDetailView ? "hidden" : ""}`}>
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
                {sortedReports.map((report, index) => (
                  <tr
                    key={report.id}
                    onClick={() => handleReportClick(report, index)}
                  >
                    {" "}
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
                        onClick={() =>
                          handlePriorityChange(report.id, report.priority)
                        }
                      >
                        <FaFlag
                          color={getFlagColor(report.priority, report.status)}
                        />
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(report.id, report.status)
                        }
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showDetailView && (
              <div className="report-details">
                <div className="detail-actions">
                  <div className="right">
                    <button
                      onClick={() => handleGeneratePdf(selectedReport.id)}
                    >
                        <FaFilePdf /> Generate PDF
                    </button>
                  </div>
                  <div className="left">
                    {currentIndex > 0 && (
                      <button onClick={() => navigateReport("prev")}>
                        <FaArrowLeft />
                      </button>
                    )}
                    {currentIndex < sortedReports.length - 1 && (
                      <button onClick={() => navigateReport("next")}>
                        <FaArrowRight />
                      </button>
                    )}
                    <button
                      onClick={() =>
                        handlePriorityChange(
                          selectedReport.id,
                          selectedReport.priority
                        )
                      }
                    >
                      <FaFlag
                        color={getFlagColor(
                          selectedReport.priority,
                          selectedReport.status
                        )}
                      />
                    </button>
                    <button onClick={() => setShowDetailView(false)}>
                      Go Back
                    </button>
                  </div>
                </div>
                <h3>Report Details</h3>
                <div
                  className="report-content"
                  style={{ overflowY: "scroll", maxHeight: "400px" }}
                >
                  <p>Title: {selectedReport.title}</p>
                  <p>Status: {selectedReport.status}</p>
                  <p>Description: {selectedReport.description}</p>
                  <ReplyComponent reportId={selectedReport} userId={userId} />
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default AdminDashboard
