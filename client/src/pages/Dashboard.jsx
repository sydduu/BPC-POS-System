import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";

const sampleBookings = [
  {
    name: "Juan Dela Cruz",
    room: "Room 101",
    date: "2025-10-28",
    status: "Confirmed",
  },
  {
    name: "Ma. Divicee",
    room: "Table 5",
    date: "2025-10-28",
    status: "Pending",
  },
  {
    name: "Mae Sgel",
    room: "Room 205",
    date: "2025-10-28",
    status: "Confirmed",
  },
  {
    name: "Cyron Villavicencio",
    room: "Room 143",
    date: "2025-10-29",
    status: "Confirmed",
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <Sidebar />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="header-actions">
            <div className="date">
              Today • {new Date().toLocaleDateString()}
            </div>
          </div>
        </header>

        <section className="metrics-grid">
          <div className="metric-card primary">
            <div className="metric-title">Total Bookings</div>
            <div className="metric-value">24</div>
          </div>

          <div className="metric-card">
            <div className="metric-title">Available Rooms</div>
            <div className="metric-value">8</div>
          </div>

          <div className="metric-card">
            <div className="metric-title">Today's Sales</div>
            <div className="metric-value">₱15,420</div>
          </div>

          <div className="metric-card">
            <div className="metric-title">Active Guests</div>
            <div className="metric-value">18</div>
          </div>
        </section>

        <section className="lower-grid">
          <div className="panel bookings-panel">
            <div className="panel-header">
              <h3>Recent Bookings</h3>
            </div>
            <ul className="bookings-list">
              {sampleBookings.map((b, i) => (
                <li key={i} className="booking-item">
                  <div className="booking-left">
                    <div className="booking-name">{b.name}</div>
                    <div className="booking-meta">
                      {b.room} • {b.date}
                    </div>
                  </div>
                  <div className={`booking-status ${b.status.toLowerCase()}`}>
                    {b.status}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel sales-panel">
            <div className="panel-header">
              <h3>Sales Summary</h3>
            </div>
            <div className="sales-list">
              <div className="sales-row">
                <span>Today</span>
                <strong>₱15,420</strong>
              </div>
              <div className="sales-row">
                <span>This Week</span>
                <strong>₱87,340</strong>
              </div>
              <div className="sales-row">
                <span>This Month</span>
                <strong>₱342,180</strong>
              </div>
              <div className="sales-row">
                <span>This Year</span>
                <strong>₱1,490,120</strong>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
