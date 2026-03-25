import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { uploadImage } from "../api";
import DetectionResult from "./DetectionResult";
import AlertBar from "./AlertBar";

const LiveDetection = ({ onNewDetection }) => {
  const webcamRef = useRef(null);
  const [result, setResult] = useState(null);
  const [alert, setAlert] = useState(false);

  const captureAndAnalyze = async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    try {
      const blob = await (await fetch(imageSrc)).blob();
      const file = new File([blob], "frame.jpg", { type: "image/jpeg" });

      const response = await uploadImage(file);
      setResult(response);

      setAlert(
        response.risk_level === "HIGH" ||
        response.risk_level === "CRITICAL"
      );

      if (onNewDetection) onNewDetection(response);
    } catch (err) {
      console.error("Live detection failed:", err);
    }
  };

  useEffect(() => {
    const interval = setInterval(captureAndAnalyze, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-detection card">
      <AlertBar
        show={alert}
        message={
          result?.risk_level === "CRITICAL"
            ? "🚨 CRITICAL RISK: REPEATED VIOLATIONS!"
            : "⚠️ Repeated Safety Violation Detected"
        }
      />

      <h2>Live Safety Monitoring</h2>

      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
        height={300}
      />

      {result && <DetectionResult data={result} />}
    </div>
  );
};

export default LiveDetection;
