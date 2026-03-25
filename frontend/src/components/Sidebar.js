import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaChartLine } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>SafeSphere</h2>
      <nav>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          <FaHome /> Home
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
          <FaChartLine /> Dashboard
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
