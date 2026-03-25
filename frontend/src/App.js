import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import DarkModeToggle from "./components/DarkModeToggle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <BrowserRouter>
      <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
        <Sidebar />
        <div className="main-content">
          <div className="top-bar">
            <h1>SafeSphere</h1>
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
