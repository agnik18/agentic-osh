import React, { useEffect, useState } from "react";
import { getReports } from "../api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const RISK_COLORS = {
  LOW: "#00c853",
  MEDIUM: "#ff9800",
  HIGH: "#f44336",
  CRITICAL: "#8b0000",
};

const Dashboard = ({ newDetection }) => {
  const [reports, setReports] = useState([]);

  // Load initial reports
  useEffect(() => {
    getReports().then(setReports);
  }, []);

  // Append new detection
  useEffect(() => {
    if (newDetection) {
      const report = {
        time: new Date().toLocaleTimeString(),
        violations: newDetection.violations,
        risk_level: newDetection.risk_level,
      };

      setReports((prev) => [...prev.slice(-19), report]);
    }
  }, [newDetection]);

  // ---------- Risk Distribution ----------
  const riskCounts = reports.reduce((acc, r) => {
    acc[r.risk_level] = (acc[r.risk_level] || 0) + 1;
    return acc;
  }, {});

  const riskPieData = Object.keys(riskCounts).map((key) => ({
    name: key,
    value: riskCounts[key],
  }));

  return (
    <div className="dashboard">
      <h2>Risk Analytics Dashboard</h2>

      {/* 🔹 Line Chart – Risk Escalation Over Time */}
      <div className="chart-container">
        <h3>Risk Level Trend</h3>
        <LineChart width={650} height={250} data={reports}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="violations"
            stroke="#ff3d00"
            name="Violations"
          />
        </LineChart>
      </div>

      {/* 🔹 Bar Chart – Risk Levels */}
      <div className="chart-container">
        <h3>Risk Level Occurrence</h3>
        <BarChart width={650} height={250} data={riskPieData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value">
            {riskPieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={RISK_COLORS[entry.name]}
              />
            ))}
          </Bar>
        </BarChart>
      </div>

      {/* 🔹 Pie Chart – Risk Distribution */}
      <div className="chart-container">
        <h3>Risk Distribution</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={riskPieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {riskPieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={RISK_COLORS[entry.name]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default Dashboard;
