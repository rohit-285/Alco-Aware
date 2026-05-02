# AlcoAware

AlcoAware is a full-stack alcohol awareness web application designed to help users understand alcohol consumption, estimate Blood Alcohol Content (BAC), and make safer decisions through educational insights, safety guidance, and drink tracking.

> Disclaimer: This platform provides estimated results only. It is not a medical device, breathalyzer, or legal authority. Never drink and drive. Always follow local laws and medical advice.

---

## Features

- Blood Alcohol Content (BAC) Calculator
- Personalized safety recommendations
- Time-to-sober estimation
- Drink history and analytics dashboard
- Health awareness insights
- Medication interaction checker
- Legal awareness information
- User authentication (Email + Google Login)
- Responsive design for mobile and desktop

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Installation & Setup

### Clone Repository

```bash
git clone <your-repository-url>
cd AlcoAware
```

### Install Backend Dependencies

```bash
cd server
npm install
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

---

## Environment Variables

Create a `server/.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:5173
```

---

## Run Project

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

Application will run at:

```bash
http://localhost:5173
```

---

## Project Structure

```text
AlcoAware/
├── client/
├── server/
├── README.md
└── package.json
```

---

## Security

Never upload your real `.env` file to :contentReference[oaicite:0]{index=0}.

Add this to `.gitignore`:

```gitignore
.env
```

---

## Author

Rohit Sharma

---

## License

MIT License