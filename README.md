# 🛡️ Agentic OSH – AI-Based PPE Detection System

## 📌 Overview

**Agentic OSH** is an AI-powered safety monitoring system designed to detect Personal Protective Equipment (PPE) compliance in real-time. It helps ensure worker safety in industrial environments by automatically identifying whether safety gear like helmets, vests, and masks are being used properly.

---

## 🚀 Features

* 🧠 **AI-Based Detection** using deep learning models
* 🎥 **Real-time monitoring** via camera feed
* 📸 **Image upload support** for detection
* 📊 **Compliance dashboard** for analysis
* 🔔 **Alert system** for safety violations
* 🌙 **Dark mode UI** for better usability

---

## 🛠️ Tech Stack

### 🔹 Frontend

* React.js
* JavaScript
* CSS

### 🔹 Backend

* Python
* Flask (or similar framework)

### 🔹 AI/ML

* YOLO / Custom trained model (`.pt` file)

---

## 📁 Project Structure

```
agentic-osh/
│
├── backend/
│   ├── app.py
│   ├── models/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── .gitignore
```

---

## ⚙️ Installation & Setup

### 🔹 Clone the repository

```bash
git clone https://github.com/agnik18/agentic-osh.git
cd agentic-osh
```

---

### 🔹 Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 📸 How It Works

1. Upload image or use live camera
2. AI model processes input
3. Detects PPE compliance
4. Displays results on dashboard

---

## ⚠️ Note

* Large files like `.pt` models are excluded from GitHub
* Add your trained model manually in:

```
backend/models/
```

---

## 🎯 Future Improvements

* Live CCTV integration
* Cloud deployment
* Mobile app support
* Advanced analytics

---

## 👨‍💻 Author

**Agnik Das**

---

## ⭐ Contribute

Feel free to fork this repository and contribute!

---

## 📜 License

This project is open-source and available under the MIT License.
