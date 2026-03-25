import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import LiveDetection from "../components/LiveDetection";
import Dashboard from "../components/Dashboard";

const Home = () => {
  const [latestDetection, setLatestDetection] = useState(null);
  const [mode, setMode] = useState("upload");

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        SafeSphere: Safety Monitoring
      </h1>

      <div className="tab-container">
        {["upload", "live"].map((tab) => (
          <div
            key={tab}
            className={`tab ${mode === tab ? "active" : ""}`}
            onClick={() => setMode(tab)}
          >
            {tab === "upload" ? "Upload & Analyze" : "Live Monitoring"}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "30px" }}>
        {mode === "upload" ? (
          <UploadForm />
        ) : (
          <LiveDetection onNewDetection={setLatestDetection} />
        )}
      </div>

      <hr style={{ margin: "50px 0" }} />

      {/* 🔥 Pass latest detection to dashboard */}
      <Dashboard newDetection={latestDetection} />
    </div>
  );
};

export default Home;
