AlcoAware – Intelligent Alcohol Awareness Platform
AlcoAware is a production-grade MERN stack web application designed to promote responsible alcohol consumption through real-time Blood Alcohol Content (BAC) analysis, AI-powered safety insights, behavioral simulation, and region-based legal awareness.

⚠️ Disclaimer: This platform is strictly for educational and awareness purposes only. BAC estimates are approximations and should never replace a certified breathalyzer. Never drink and drive. Always follow your local laws.


🚀 Features

Advanced BAC calculation using Widmark + Watson formula with real-time decay curve
Interactive India legal awareness map with dry state detection and BAC driving limits
Behavioral simulation engine (Sober → Euphoric → Confused → Stupor stages)
Health risk dashboard with liver stress, dehydration, and caloric intake tracking
AI Drink Advisor powered by Claude AI for personalized safety advice
Voice input mode — speak your drinks to auto-fill the calculator
Drink photo recognition — upload a photo to identify drink type and ABV
Live session tracker with real-time BAC recalculation and drink timeline
Personalized tolerance profile that learns your drinking patterns over time
Emergency SOS panel with one-tap access to emergency contacts and GPS alert
Sobriety streak tracker with badges and shareable milestone cards
Safe Night Buddy System — auto-alerts your friend if your BAC exceeds a threshold
Drink limit goal setting with progress bar and escalating warnings
Community insights feed with anonymous regional drinking trends
Personal drinking history with weekly and monthly trend charts
Hangover predictor with severity scoring and personalized recovery plan
Medication interaction checker with severity-rated alcohol-drug warnings
Session report PDF export with BAC curve and full drink log
Drunk Mode UI — auto-activates at BAC ≥ 0.08% with simplified large-button layout
Smart notification system for sober countdowns and hydration reminders
Review and feedback system with ratings
Responsive UI with smooth animations using Framer Motion


🛠️ Tech Stack
Frontend: React.js, React Router, Tailwind CSS, Framer Motion, Recharts, Axios, Zustand, React Query, React Leaflet, jsPDF
Backend: Node.js, Express.js, MongoDB, Mongoose, JSON Web Tokens, bcryptjs, Nodemailer, express-validator, Multer, node-cron
External APIs: Anthropic Claude API (AI Advisor + Photo Recognition)
Deployment: Vercel (Frontend), Render (Backend), MongoDB Atlas

📂 Project Structure
alcoaware/
├── client/          → React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       ├── hooks/
│       ├── store/
│       └── utils/
└── server/          → Node.js backend
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    └── utils/

⚙️ Setup Instructions
1. Clone the Repository
bashgit clone https://github.com/yourusername/alcoaware.git
cd alcoaware
2. Install Dependencies
bash# Backend
cd server
npm install

# Frontend
cd ../client
npm install
3. Configure Environment Variables
Create a .env file inside the server/ folder:
envMONGO_URI=mongodb://127.0.0.1:27017/alcoaware
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_app_password
ANTHROPIC_API_KEY=your_claude_api_key
FRONTEND_URL=http://localhost:3000
Create a .env file inside the client/ folder:
envREACT_APP_API_BASE=http://localhost:5000/api
4. Start the Application
bash# Run backend (Terminal 1)
cd server
npm run dev

# Run frontend (Terminal 2)
cd client
npm start

🌐 API Endpoints
MethodEndpointDescriptionPOST/api/auth/registerRegister new userPOST/api/auth/loginLogin and receive JWTGET/api/auth/meGet current userPOST/api/calculateCalculate BAC and store resultPOST/api/sessions/startStart a live drink sessionPOST/api/sessions/:id/addAdd drink to active sessionGET/api/sessions/:id/bacGet current BAC for sessionPATCH/api/sessions/:id/endEnd sessionGET/api/historyGet personal drinking historyPOST/api/buddy/requestSend a buddy invitePOST/api/ai/adviceGet AI drink advisor responsePOST/api/image/identify-drinkIdentify drink from photoPOST/api/medications/checkCheck alcohol-drug interactionsPOST/api/streak/checkinLog a sober dayPOST/api/reviewsSubmit a reviewGET/api/reviewsGet all reviewsGET/api/statsFetch platform analyticsGET/api/stats/communityGet regional community insights

🧠 Core Formula
Widmark BAC Formula:
BAC = (A / (W × r)) × 100

A = Alcohol consumed in grams (Volume × ABV% × 0.789)
W = Body weight in grams
r = Gender constant: 0.68 (male), 0.55 (female)
BAC Decay:
Current BAC = Raw BAC − (0.015 × Hours elapsed)
Hours to Sober = Current BAC / 0.015

🚢 Deployment

Frontend → Deploy the client/ folder on Vercel. Set REACT_APP_API_BASE to your backend URL.
Backend → Deploy the server/ folder on Render. Add all environment variables in the dashboard.
Database → Use MongoDB Atlas and update MONGO_URI with your connection string.


🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
bashgit checkout -b feature/your-feature-name
git commit -m "feat: describe your change"
git push origin feature/your-feature-name

👨‍💻 Author
Rohit Sharma
B.Tech Computer Science Engineering
GitHub: @yourusername
LinkedIn: Rohit Sharma

📄 License
This project is licensed under the MIT License.

If you found this project useful, consider giving it a ⭐ on GitHub.