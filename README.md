# Fitness & Wellness Portal 💪

A complete full-stack fitness and wellness application built with React, Node.js, Express, and MongoDB. Track workouts, monitor nutrition, manage wellness metrics, and achieve your fitness goals with our comprehensive platform.

## 🎯 Project Overview

FitWell is a production-ready fitness tracking application featuring:
- **User Authentication**: Secure registration and login with JWT
- **Fitness Tracking**: Log workouts with detailed metrics
- **Nutrition Management**: Track meals, calories, and macros
- **Wellness Monitoring**: Track sleep, water intake, and stress levels
- **Dashboard Analytics**: Visual insights with charts and statistics
- **Responsive UI**: Mobile-friendly design with TailwindCSS
- **Secure Architecture**: Password hashing, token-based auth, protected routes

## 🛠 Tech Stack

### Frontend
- **React 18**: UI library
- **Vite**: Fast build tool and dev server
- **React Router v6**: Client-side routing
- **Axios**: HTTP client for API calls
- **TailwindCSS**: Utility-first CSS framework
- **Recharts**: Data visualization and charts
- **React Hot Toast**: Beautiful notifications

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **JWT**: Secure authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-Origin Resource Sharing
- **Helmet**: Security middleware

## 📁 Project Structure

```
fitness-wellness-portal/
├── src/                             # Frontend (React + Vite)
│   ├── components/                  # Reusable components
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/                       # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Workouts.jsx
│   │   ├── Diet.jsx
│   │   ├── Wellness.jsx
│   │   └── Profile.jsx
│   ├── context/                     # Context API
│   │   └── AuthContext.jsx
│   ├── services/                    # API services
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── server/                          # Backend (Node.js + Express)
│   ├── config/
│   │   └── database.js              # MongoDB connection
│   ├── models/                      # Mongoose models
│   │   ├── User.js
│   │   ├── Workout.js
│   │   ├── Diet.js
│   │   └── Wellness.js
│   ├── controllers/                 # Business logic
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── workoutController.js
│   │   ├── dietController.js
│   │   └── wellnessController.js
│   ├── routes/                      # API routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── workouts.js
│   │   ├── diets.js
│   │   └── wellness.js
│   ├── middleware/                  # Custom middleware
│   │   └── auth.js                  # JWT verification
│   ├── server.js                    # Express app entry point
│   ├── package.json
│   ├── .env
│   └── README.md
│
├── package.json                     # Frontend package config
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # TailwindCSS config
├── .env                             # Frontend env vars
└── README.md
```

## ⚙️ Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Git

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd fitness-wellness-portal
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd server
npm install
```

#### Configure Environment Variables
Create `.env` file in the `server/` directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/fitness-wellness-portal
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/fitness-wellness-portal

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_change_this_in_production_12345678901234567890
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

#### Install MongoDB (if using local)
- **Windows**: Download from https://www.mongodb.com/try/download/community
- **Mac**: `brew install mongodb-community`
- **Linux**: Follow official MongoDB docs

#### Start MongoDB
```bash
# Windows
mongod

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

#### Start the Backend Server
```bash
npm run dev
# Server will start on http://localhost:5000
```

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../
npm install
```

#### Configure Environment Variables
Create `.env` file in the root directory (frontend):
```env
VITE_API_URL=http://localhost:5000/api
```

#### Start the Development Server
```bash
npm run dev
# Frontend will start on http://localhost:5173
```

## 📚 API Documentation

### Authentication Endpoints
```
POST /api/auth/register         - Register new user
POST /api/auth/login            - User login
```

### User Endpoints
```
GET /api/users/profile          - Get user profile (protected)
PUT /api/users/profile          - Update user profile (protected)
```

### Workout Endpoints
```
POST /api/workouts              - Add new workout (protected)
GET /api/workouts               - Get all workouts (protected)
GET /api/workouts?startDate=... - Filter by date (protected)
DELETE /api/workouts/:id        - Delete workout (protected)
```

### Diet Endpoints
```
POST /api/diets                 - Add new meal (protected)
GET /api/diets                  - Get all meals (protected)
GET /api/diets?startDate=...    - Filter by date (protected)
DELETE /api/diets/:id           - Delete meal (protected)
```

### Wellness Endpoints
```
POST /api/wellness              - Add wellness data (protected)
GET /api/wellness               - Get wellness data (protected)
GET /api/wellness?startDate=... - Filter by date (protected)
DELETE /api/wellness/:id        - Delete wellness data (protected)
```

## 🗄️ Database Schema

### User Collection
```javascript
{
  name: String (required),
  email: String (unique, required),
  password: String (hashed, required),
  age: Number,
  height: Number (cm),
  weight: Number (kg),
  goal: String (enum: weight_loss, muscle_gain, maintain_fitness, general_wellness),
  timestamps: true
}
```

### Workout Collection
```javascript
{
  user: ObjectId (reference to User),
  exerciseName: String (required),
  duration: Number (minutes),
  caloriesBurned: Number,
  date: Date,
  timestamps: true
}
```

### Diet Collection
```javascript
{
  user: ObjectId (reference to User),
  mealName: String (required),
  calories: Number (required),
  protein: Number (grams),
  carbs: Number (grams),
  fats: Number (grams),
  date: Date,
  timestamps: true
}
```

### Wellness Collection
```javascript
{
  user: ObjectId (reference to User),
  sleepHours: Number,
  waterIntake: Number (liters),
  stressLevel: String (enum: low, medium, high),
  notes: String,
  date: Date,
  timestamps: true
}
```

## 🔐 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Protected Routes**: Frontend route guards and backend middleware
- **CORS**: Configured to allow only frontend origin
- **Helmet**: Security headers
- **Input Validation**: Server-side validation on all endpoints

## 🎨 UI/UX Features

- **Responsive Design**: Mobile, tablet, and desktop views
- **Modern Styling**: TailwindCSS for clean, professional UI
- **Interactive Charts**: Recharts for data visualization
- **Toast Notifications**: Real-time user feedback
- **Loading States**: Better UX with loading indicators
- **Form Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error messages
- **Smooth Transitions**: Hover effects and animations

## 📊 Key Features in Detail

### 1. Authentication System
- User registration with validation
- Secure login with password verification
- JWT token generation and storage
- Automatic logout on token expiration
- Protected routes on frontend and backend

### 2. Dashboard
- Summary cards (BMI, calories, workouts)
- Weekly progress charts
- Recent workouts list
- Recent meals list
- At-a-glance fitness overview

### 3. Workout Management
- Add workouts with exercise name, duration, calories
- View all workouts with filtering
- Delete workouts
- Calculate total calories and minutes

### 4. Diet Tracking
- Log meals with full nutrition info (P/C/F)
- Daily nutrition summary
- Meal history with dates
- Delete meal entries

### 5. Wellness Tracking
- Sleep hours monitoring
- Water intake tracking
- Stress level logging
- Optional wellness notes
- Historical data view

### 6. Profile Management
- View and update user information
- Update physical metrics (height, weight, age)
- Set fitness goals
- BMI calculation

## 🧪 Testing

You can create test accounts through the registration page. Example:
- Email: `user@example.com`
- Password: `password123` (min 6 characters)

## 🚢 Deployment

### Backend (Render)
1. Push code to GitHub
2. Connect to Render
3. Set environment variables
4. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Import to Vercel
3. Set `VITE_API_URL` environment variable
4. Deploy

## 📝 Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend
```bash
cd server
npm run dev      # Start with nodemon
npm start        # Start server
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify network access if using MongoDB Atlas

### CORS Errors
- Check `FRONTEND_URL` in server `.env`
- Ensure ports are correct (5000 for backend, 5173 for frontend)

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Token Expired
- Clear localStorage and login again
- Check JWT_EXPIRE value

## 📖 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [TailwindCSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit and push
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎓 Learning Outcomes

By exploring this project, you'll learn:
- Full-stack web application development
- React hooks and context API
- RESTful API design with Express
- MongoDB database design and queries
- JWT authentication and authorization
- Form validation and error handling
- Responsive design with TailwindCSS
- Data visualization with Recharts
- Production-ready code structure
- Security best practices

## 🔄 Future Enhancements

- [ ] Social features (friend connections)
- [ ] Workout video tutorials integration
- [ ] AI-powered fitness recommendations
- [ ] Mobile app (React Native)
- [ ] Payment integration
- [ ] Advanced analytics and reports
- [ ] Real-time notifications
- [ ] Integration with fitness devices

---

**Happy Coding! 🚀**

For questions or issues, please feel free to reach out or open an issue on GitHub.

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
