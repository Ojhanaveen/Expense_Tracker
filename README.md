# 🌌 ExpenseTracker Pro
<div align="center">
  <h3>A World-Class, Premium Financial Dashboard Built for the Modern Web.</h3>
  <p>Engineered with a Dark-Mode Glassmorphic Design, highly secure HttpOnly Authentication, and real-time MongoDB Aggregations.</p>

  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
</div>

---

## ✨ Features (The "World-Class" Standard)

### 🎨 Unmatched Premium UI/UX
- **Deep-Sea Glassmorphism**: Stunning, translucent, high-blur architectural layers (`glass-dark` components).
- **Framer Motion Micro-Interactions**: Fluid route transitions, animated table row reveals, and interactive hover states.
- **Lucide Icons**: Crisp, uniform, modern SVG iconography spanning the entire application footprint.

### 🛡️ Enterprise-Grade Security
- **HttpOnly Cross-Site Sessions**: Zero risk of XSS token-theft. JWT Auth tokens are exchanged securely via heavily restricted HTTP-Only cookies (`SameSite=none`, `Secure=true`).
- **No IDOR Constraints**: Database queries strictly bind every transaction modification precisely to the operating `req.user.id`.
- **Advanced Rate Limiting**: Intelligent backend throttling rejecting bot brute-force attempts at the Network (L7) layer.

### ⚡ Lightning Fast Data
- **Real-Time Aggregations**: The dashboard utilizes deep MongoDB Aggregation Pipelines to categorize expenses and output actionable spending statistics in under 20ms.

## 🚀 Quick Start (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/Ojhanaveen/Expense_Tracker.git
cd Expense_Tracker
```

### 2. Environment Setup
You will need two `.env` files. 

**Server (`/server/.env`)**
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

**Client (`/client/.env`)**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Install & Run 
#### Booting the Backend API
```bash
cd server
npm install
npm run dev
```

#### Booting the Frontend Client
Open a second terminal window:
```bash
cd client
npm install
npm run dev
```

Your premium application will now be running blazingly fast on `http://localhost:5173`.

## 📦 Deployment Architecture
- **Frontend Presentation Layer**: Hosted seamlessly on **Vercel** relying on automated Git Hook Deployments.
- **Backend API Layer**: Processed effortlessly through **Render** for persistent computing environments.
- **Database**: Hosted securely on **MongoDB Atlas** passing multi-zone clustering.

---

> *Developed with cutting-edge architectural methodologies crossing advanced frontend aesthetics with hardened backend defensive postures.*
