import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Reports.css";

// Sample data for reports
const dailySalesData = [
  { date: "2025-10-27", category: "Food", amount: 12500 },
  { date: "2025-10-27", category: "Beverages", amount: 3800 },
  { date: "2025-10-27", category: "Room Service", amount: 25000 },
  { date: "2025-10-27", category: "Accommodation", amount: 45000 },
];

const topSellingItems = [
  { name: "Adobo", quantity: 45, revenue: 6750 },
  { name: "Sinigang", quantity: 38, revenue: 5700 },
  { name: "Room 201 - Deluxe", quantity: 5, revenue: 15000 },
  { name: "Halo-halo", quantity: 67, revenue: 3350 },
  { name: "Soft drinks", quantity: 120, revenue: 6000 },
];

const ReportCard = ({ title, children }) => (
  <div className="report-card">
    <h2>{title}</h2>
    {children}
  </div>
);

const SalesChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="sales-chart">
      {data.map((item, index) => (
        <div key={index} className="chart-bar">
          <div className="bar-label">
            <span>{item.category}</span>
            <span className="amount">₱{item.amount.toLocaleString()}</span>
          </div>
          <div className="bar-container">
            <div
              className="bar-fill"
              style={{ width: (item.amount / total) * 100 + "%" }}
            />
          </div>
        </div>
      ))}
      <div className="total-row">
        <span>Total Sales</span>
        <span className="total-amount">₱{total.toLocaleString()}</span>
      </div>
    </div>
  );
};

const TopSellingTable = ({ data }) => (
  <div className="table-container">
    <table className="data-table">
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Quantity Sold</th>
          <th>Revenue</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>₱{item.revenue.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const MetricCard = ({ label, value, trend }) => (
  <div className="metric-card">
    <div className="metric-content">
      <h3>{label}</h3>
      <div className="metric-value">{value}</div>
    </div>
    <div className={"metric-trend " + (trend >= 0 ? "positive" : "negative")}>
      {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
    </div>
  </div>
);

const Reports = () => {
  const [selectedDate] = useState("2025-10-27");

  return (
    <div className="reports-page">
      <Sidebar />

      <main className="reports-main">
        <header className="page-header">
          <h1>Reports</h1>
          <p className="subtitle">View sales report and analytics</p>
        </header>

        <div className="metrics-grid">
          <MetricCard label="Today's Revenue" value="₱86,300" trend={12.5} />
          <MetricCard label="Orders" value="156" trend={8.2} />
          <MetricCard label="Average Order Value" value="₱553" trend={-2.1} />
          <MetricCard label="Room Occupancy" value="85%" trend={15.3} />
        </div>

        <div className="reports-grid">
          <ReportCard title="Daily Sales Report">
            <div className="card-header">
              <h3>Sales by Category - {selectedDate}</h3>
            </div>
            <SalesChart data={dailySalesData} />
          </ReportCard>

          <ReportCard title="Top Selling Items">
            <div className="card-header">
              <h3>Best Performing Products</h3>
            </div>
            <TopSellingTable data={topSellingItems} />
          </ReportCard>
        </div>
      </main>
    </div>
  );
};

export default Reports;
