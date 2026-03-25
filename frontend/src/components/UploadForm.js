import React, { useState } from "react";
import { uploadImage } from "../api";
import DetectionResult from "./DetectionResult";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please select a file!");

    setLoading(true);
    setError(null);

    try {
      const res = await uploadImage(file);
      setResult(res);
    } catch (err) {
      setError("Upload failed. Check if backend is running on port 5000.");
    }

    setLoading(false);
  };

  return (
    <div className="card">
      <h2>Upload & Analyze</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" style={{ marginLeft: "10px" }}>
          Analyze
        </button>
      </form>
      {loading && <p>Analyzing...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && <DetectionResult data={result} />}
    </div>
  );
};

export default UploadForm;
