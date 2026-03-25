import axios from "axios";

// Make sure this matches your backend
const API_BASE = "http://127.0.0.1:5000";

// Upload an image
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(`${API_BASE}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    console.error("Upload failed:", err);
    throw err;
  }
};

// Get reports (last 20 detections)
export const getReports = async () => {
  try {
    const res = await axios.get(`${API_BASE}/reports`);
    return res.data;
  } catch (err) {
    console.error("Fetching reports failed:", err);
    return [];
  }
};
