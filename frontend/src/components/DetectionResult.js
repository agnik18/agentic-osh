import React from "react";

const DetectionResult = ({ data }) => {
  const colorMap = {
    LOW: "green",
    MEDIUM: "orange",
    HIGH: "red",
    CRITICAL: "darkred",
  };

  return (
    <div style={{ marginTop: "15px" }}>
      <h3>Detection Summary</h3>

      <p>
        <strong>Violations:</strong> {data.violations}<br />
        <strong>Consecutive Violations:</strong>{" "}
        {data.consecutive_violations}<br />
        <strong>Risk Level:</strong>{" "}
        <span style={{ color: colorMap[data.risk_level], fontWeight: "bold" }}>
          {data.risk_level}
        </span>
      </p>

      <img
        src={`data:image/jpeg;base64,${data.annotated_image}`}
        alt="Result"
        width="400"
        style={{ borderRadius: "10px" }}
      />
    </div>
  );
};

export default DetectionResult;
