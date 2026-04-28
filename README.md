# AlcoAware – Intelligent Alcohol Awareness Platform

AlcoAware is a production-grade MERN stack web application designed to promote responsible alcohol consumption through real-time Blood Alcohol Content (BAC) analysis, behavioral insights, and region-based legal awareness.

The platform utilizes the Widmark formula to deliver accurate BAC estimations while integrating compliance features such as dry state detection, analytics dashboards, and user feedback systems.

---

## ⚠️ Disclaimer

Alcohol consumption can be harmful to health. This platform is strictly intended for educational and awareness purposes. Users are strongly advised to follow local laws and avoid drinking and driving.

---

## 🚀 Key Features

* Accurate BAC calculation using Widmark formula
* Region-based legal awareness (Dry State Detection)
* Real-time input validation with dynamic UI updates
* Behavioral Insights Engine (condition-based simulation)
* Health Risk Indicator (Safe / Moderate / High Risk levels)
* Interactive analytics dashboard with charts
* Review & feedback system with ratings
* Persistent data storage using MongoDB
* Responsive UI with smooth animations

---

## 🛠️ Tech Stack

**Frontend:**
React.js, React Router, Tailwind CSS, Framer Motion, Axios, Recharts

**Backend:**
Node.js, Express.js, MongoDB, Mongoose, dotenv, express-validator

**Deployment:**
Vercel (Frontend), Render (Backend), MongoDB Atlas

---

## 📂 Project Structure

client/ → React frontend
server/ → Node.js backend

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-link>
cd alcoaware
```

### 2. Install Dependencies

Backend:

```bash
cd server
npm install
```

Frontend:

```bash
cd client
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file inside the server folder:

```env
MONGO_URI=mongodb://127.0.0.1:27017/alcoaware
PORT=5000
NODE_ENV=development
```

---

### 4. Start the Application

Run backend:

```bash
cd server
npm run dev
```

Run frontend:

```bash
cd client
npm start
```

---

## 🌐 API Endpoints

* `POST /api/calculate` → Calculate BAC and store data
* `POST /api/reviews` → Submit user feedback
* `GET /api/reviews` → Retrieve reviews
* `GET /api/stats` → Fetch analytics data

---

## 🧠 Core Formula

BAC = (A / (W × r)) × 100

Where:
A = Alcohol consumed (grams)
W = Body weight (grams)
r = Gender constant (0.68 male, 0.55 female)

---

## 🧩 Advanced Capabilities

* State-based restriction awareness (dry state detection)
* Data visualization for behavioral insights
* Scalable REST API architecture
* Modular frontend for maintainability

---

## 🔐 Best Practices

* Secure environment configuration using `.env`
* Input validation using express-validator
* Clean and scalable project structure
* Deployment-ready architecture

---

## 👨‍💻 Author

Rohit Sharma
B.Tech Computer Science Engineering

---

## ⭐ Acknowledgment

If you find this project useful, consider giving it a star ⭐ on GitHub.
