# Backend - Fitness & Wellness Portal Server

This is the backend API server for the Fitness & Wellness Portal application built with Node.js and Express.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

Edit `.env` and update values:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fitness-wellness-portal
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### 3. Start MongoDB
```bash
# Local MongoDB
mongod

# Or using MongoDB Atlas (cloud)
# Update MONGODB_URI in .env with your connection string
```

### 4. Start Development Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users (Protected)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Workouts (Protected)
- `POST /api/workouts` - Add workout
- `GET /api/workouts` - Get all workouts
- `DELETE /api/workouts/:id` - Delete workout

### Diet (Protected)
- `POST /api/diets` - Add meal
- `GET /api/diets` - Get all meals
- `DELETE /api/diets/:id` - Delete meal

### Wellness (Protected)
- `POST /api/wellness` - Add wellness entry
- `GET /api/wellness` - Get wellness data
- `DELETE /api/wellness/:id` - Delete wellness entry

## Project Structure

```
server/
├── config/
│   └── database.js          # MongoDB connection
├── models/
│   ├── User.js
│   ├── Workout.js
│   ├── Diet.js
│   └── Wellness.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── workoutController.js
│   ├── dietController.js
│   └── wellnessController.js
├── routes/
│   ├── auth.js
│   ├── users.js
│   ├── workouts.js
│   ├── diets.js
│   └── wellness.js
├── middleware/
│   └── auth.js              # JWT verification
├── server.js                # Entry point
├── package.json
├── .env
└── .env.example
```

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jwt-simple**: JWT token handling
- **bcryptjs**: Password hashing
- **dotenv**: Environment variables
- **cors**: Cross-Origin Resource Sharing
- **helmet**: Security headers
- **express-validator**: Input validation

## Development Dependencies

- **nodemon**: Auto-restart server on file changes

## Key Features

✅ User authentication with JWT  
✅ MongoDB integration with Mongoose  
✅ Password hashing with bcryptjs  
✅ Protected API routes  
✅ CORS configuration  
✅ Security headers with Helmet  
✅ Input validation  
✅ Error handling  
✅ RESTful API design  

## Database Models

### User
- name, email, password (hashed)
- age, height, weight
- fitness goal
- timestamps

### Workout
- user (reference)
- exerciseName, duration
- caloriesBurned, date
- timestamps

### Diet
- user (reference)
- mealName, calories
- protein, carbs, fats
- date, timestamps

### Wellness
- user (reference)
- sleepHours, waterIntake
- stressLevel, notes
- date, timestamps

## Security

🔒 Passwords are hashed using bcryptjs  
🔒 JWT tokens for authentication  
🔒 Protected routes with middleware  
🔒 Input validation on all endpoints  
🔒 CORS configured for specific origins  
🔒 Security headers with Helmet  

## Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network connectivity

**Port Already in Use**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

**JWT Errors**
- Clear browser localStorage and login again
- Check JWT_SECRET is set correctly

## Testing

Test endpoints using Postman, Insomnia, or curl:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"test123"}'

# Get Profile (use token from login)
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer <TOKEN>"
```

## Production Deployment

Before deploying:
1. Change NODE_ENV to "production"
2. Use a strong JWT_SECRET
3. Use MongoDB Atlas for database
4. Set FRONTEND_URL to your production frontend URL
5. Enable all security measures
6. Set up monitoring and logging
7. Use environment variables for sensitive data

## License

MIT
