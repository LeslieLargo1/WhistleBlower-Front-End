import React, { useState, useEffect } from "react"
import "./styles/style.css"
import {
  FaInbox,
  FaFileAlt,
  FaDraft2Digital,
  FaRegFileAlt,
  FaRegCheckCircle,
  FaCalendarAlt,
  FaRegListAlt,
  FaRegStar,
  FaPlus,
  FaRegCheckSquare,
} from "react-icons/fa"
import { useAuth } from "../AuthContext/AuthContext"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const [reports, setReports] = useState([])
  const [selectedReport, setSelectedReport] = useState(null)
  const [filteredReports, setFilteredReports] = useState([])
  const { token } = useAuth()
  const navigate = useNavigate()
  const newReportsCount = reports.filter((r) => r.status === "new").length

  useEffect(() => {
    const fetchReports = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
  
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
  
      try {
        const response = await fetch(
          "https://whistle-blower-server.vercel.app/users/client/dashboard",
          requestOptions
        );
        const data = await response.json();
  
        if (data && Array.isArray(data.reports)) {
          setReports(data.reports);
        }
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    };
  
    fetchReports();  
  }, [token]);

  useEffect(() => {
    setFilteredReports(reports);
  }, [reports]);

  const handleReportClick = (report) => {
    setSelectedReport(report)
  }

  const handleCreateReport = () => {
    navigate("/report-form")
  }

  const handleSort = (key) => {
    let sortedReports = [...filteredReports];
    sortedReports.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    setFilteredReports(sortedReports);
  };
  
  const handleFilter = (filterKey) => {
    const filtered = reports.filter((report) => {
      switch (filterKey) {
        case "new":
          return report.status === "new";
        case "closed":
          return report.status === "closed";
        default:
          return true;
      }
    });
    setFilteredReports(filtered);
  };
  

  return (
    <div className="dashboard">
      <header className="header">
        <h1>Dashboard</h1>
      </header>
      <div className="main">
        <aside className="sidebar">
          <button className="new-report-btn" onClick={handleCreateReport}>
            <FaPlus size={18} /> Create New Report
          </button>
          <ul className="menu">
            <li>
              <FaInbox size={18} /> Inbox
              {newReportsCount > 0 && (
                <span className="badge">{newReportsCount}</span>
              )}
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
            <span onClick={() => handleSort("title")} title="Sort by Title">
              <FaRegFileAlt size={18} />
            </span>
            <span onClick={() => handleSort("status")} title="Sort by Status">
              <FaRegCheckCircle size={18} />
            </span>
            <span onClick={() => handleSort("date")} title="Sort by Date">
              <FaCalendarAlt size={18} />
            </span>
            <label>Filter: </label>
            <span onClick={() => handleFilter("all")} title="Show All">
              <FaRegListAlt size={18} />
            </span>
            <span onClick={() => handleFilter("new")} title="Show New">
              <FaRegStar size={18} />
            </span>
            <span onClick={() => handleFilter("closed")} title="Show Closed">
              <FaRegCheckSquare size={18} />
            </span>
          </div>
          <h2>Inbox</h2>
          <table className="report-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} onClick={() => handleReportClick(report)}>
                  <td>{report.title}</td>
                  <td>{report.status}</td>
                  <td>{report.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedReport && (
            <div className="report-details">
              <h3>Report Details</h3>
              <p>Title: {selectedReport.title}</p>
              <p>Status: {selectedReport.status}</p>
              <p>Date: {selectedReport.date}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Dashboard
