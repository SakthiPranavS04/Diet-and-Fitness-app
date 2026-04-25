# ⚡ Quick Start Guide

Get the Fitness & Wellness Portal running in 10 minutes!

## 📋 Prerequisites
- Node.js (v16+)
- MongoDB (local or MongoDB Atlas)
- Git

## 🚀 Installation (5 minutes)

### Step 1: Clone & Install Dependencies
```bash
# Clone the repository
git clone <repository-url>
cd fitness-wellness-portal

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Step 2: Configure Environment

**Create frontend .env** (root directory):
```env
VITE_API_URL=http://localhost:5000/api
```

**Create backend .env** (server directory):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/fitness-wellness-portal
JWT_SECRET=your_secret_key_min_32_chars_long_please_change_this
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### Step 3: Start MongoDB
```bash
# Windows - in terminal
mongod

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

## ⚡ Run the Application (2 terminals)

### Terminal 1 - Backend
```bash
cd server
npm run dev
# Backend starts on http://localhost:5000
```

### Terminal 2 - Frontend
```bash
npm run dev
# Frontend starts on http://localhost:5173
```

## ✨ That's It!

Open http://localhost:5173 in your browser!

### Test the App
1. **Register** - Create a new account
2. **Dashboard** - View your fitness overview
3. **Add Workout** - Log an exercise
4. **Track Diet** - Log a meal
5. **Monitor Wellness** - Track sleep/water/stress
6. **Update Profile** - Manage your information

---

## 📁 Key Files Location

| What | Location |
|------|----------|
| Frontend Code | `src/` |
| Backend Code | `server/` |
| Frontend Config | `vite.config.js`, `tailwind.config.js` |
| Backend Config | `server/server.js`, `server/config/database.js` |
| Environment Setup | `.env`, `server/.env` |

---

## 🔧 Common Issues & Solutions

### "MongoDB connection failed"
```bash
# Make sure MongoDB is running
# Windows: mongod
# Check MONGODB_URI in server/.env
```

### "Port 5000 already in use"
```bash
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
# Then kill the process
```

### "Cannot find module"
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

---

## 📚 Full Documentation

- **README.md** - Complete project overview
- **API_REFERENCE.md** - All API endpoints
- **DEPLOYMENT.md** - Deploy to production
- **PROJECT_OVERVIEW.md** - Project structure

---

## 🎯 Next Steps

1. ✅ Explore the dashboard
2. ✅ Add some test data
3. ✅ Review the code structure
4. ✅ Check out the API in API_REFERENCE.md
5. ✅ Deploy to production (see DEPLOYMENT.md)

---

## 🚀 Deploy to Production

When ready to go live:

**Frontend**: https://vercel.com (free)  
**Backend**: https://render.com (free)  
**Database**: https://mongodb.com/cloud/atlas (free)

See DEPLOYMENT.md for detailed instructions.

---

**Happy coding! 💪**
