import React, { useState, useEffect } from "react";
import "./styles/style.css";
import { FaInbox, FaFileAlt, FaDraft2Digital, FaPlus } from "react-icons/fa";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [filteredReports, setFilteredReports] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();
  const newReportsCount = reports.filter((r) => r.status === "new").length;

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
          "https://whistle-blower-server.vercel.app/users/client/dashboard",
          requestOptions
        )
        const data = await response.json()

        if (data && Array.isArray(data.reports)) {
          setReports(data.reports)
        }
      } catch (error) {
        console.error("Failed to fetch reports:", error)
      }
    }

    setFilteredReports(reports);
  }, [token])

  const handleReportClick = (report) => {
    setSelectedReport(report);
  };

  const handleCreateReport = () => {
    navigate("/report-form");
  };

  const handleSort = (e) => {
    const value = e.target.value;
    let sortedReports = [...filteredReports];
    setFilteredReports(sortedReports);
  };

  const handleFilter = (e) => {
    const value = e.target.value;
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
              {newReportsCount > 0 && <span className="badge">{newReportsCount}</span>}
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
          <div className="sort-filter">
            <select onChange={handleSort}>
              <option value="title">Sort by Title</option>
              <option value="status">Sort by Status</option>
              <option value="date">Sort by Date</option>
            </select>
            <select onChange={handleFilter}>
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="closed">Closed</option>
            </select>
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
  );
};

export default Dashboard
