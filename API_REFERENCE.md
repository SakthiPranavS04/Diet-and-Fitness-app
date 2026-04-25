# API Reference Guide

Complete reference for all API endpoints in the Fitness & Wellness Portal.

## Base URL
```
http://localhost:5000/api
```

## Authentication Header Format
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 🔐 Authentication Endpoints (Public)

### 1. Register User
**POST** `/auth/register`

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure_password",
  "age": 28,
  "height": 175,
  "weight": 70,
  "goal": "muscle_gain"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### 2. Login User
**POST** `/auth/login`

Request:
```json
{
  "email": "john@example.com",
  "password": "secure_password"
}
```

Response:
```json
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## 👤 User Endpoints (Protected)

### 1. Get User Profile
**GET** `/users/profile`

Headers:
```
Authorization: Bearer <TOKEN>
```

Response:
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 28,
    "height": 175,
    "weight": 70,
    "goal": "muscle_gain",
    "bmi": "22.8"
  }
}
```

---

### 2. Update User Profile
**PUT** `/users/profile`

Headers:
```
Authorization: Bearer <TOKEN>
Content-Type: application/json
```

Request:
```json
{
  "name": "Jane Doe",
  "age": 29,
  "height": 165,
  "weight": 65,
  "goal": "weight_loss"
}
```

Response:
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Jane Doe",
    "email": "john@example.com",
    "age": 29,
    "height": 165,
    "weight": 65,
    "goal": "weight_loss",
    "bmi": "23.9"
  }
}
```

---

## 💪 Workout Endpoints (Protected)

### 1. Add Workout
**POST** `/workouts`

Headers:
```
Authorization: Bearer <TOKEN>
Content-Type: application/json
```

Request:
```json
{
  "exerciseName": "Running",
  "duration": 30,
  "caloriesBurned": 300,
  "date": "2024-04-25"
}
```

Response:
```json
{
  "success": true,
  "message": "Workout added successfully",
  "workout": {
    "_id": "507f1f77bcf86cd799439012",
    "user": "507f1f77bcf86cd799439011",
    "exerciseName": "Running",
    "duration": 30,
    "caloriesBurned": 300,
    "date": "2024-04-25T00:00:00.000Z",
    "createdAt": "2024-04-25T10:30:00.000Z",
    "updatedAt": "2024-04-25T10:30:00.000Z"
  }
}
```

---

### 2. Get All Workouts
**GET** `/workouts`

Headers:
```
Authorization: Bearer <TOKEN>
```

Query Parameters:
```
?startDate=2024-04-18&endDate=2024-04-25
```

Response:
```json
{
  "success": true,
  "data": {
    "workouts": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "exerciseName": "Running",
        "duration": 30,
        "caloriesBurned": 300,
        "date": "2024-04-25T00:00:00.000Z"
      }
    ],
    "summary": {
      "totalWorkouts": 5,
      "totalCalories": 1500,
      "totalMinutes": 150
    }
  }
}
```

---

### 3. Delete Workout
**DELETE** `/workouts/:id`

Headers:
```
Authorization: Bearer <TOKEN>
```

Response:
```json
{
  "success": true,
  "message": "Workout deleted successfully"
}
```

---

## 🍽️ Diet Endpoints (Protected)

### 1. Add Meal
**POST** `/diets`

Headers:
```
Authorization: Bearer <TOKEN>
Content-Type: application/json
```

Request:
```json
{
  "mealName": "Breakfast - Scrambled Eggs",
  "calories": 350,
  "protein": 25,
  "carbs": 20,
  "fats": 15,
  "date": "2024-04-25"
}
```

Response:
```json
{
  "success": true,
  "message": "Meal added successfully",
  "meal": {
    "_id": "507f1f77bcf86cd799439013",
    "user": "507f1f77bcf86cd799439011",
    "mealName": "Breakfast - Scrambled Eggs",
    "calories": 350,
    "protein": 25,
    "carbs": 20,
    "fats": 15,
    "date": "2024-04-25T00:00:00.000Z",
    "createdAt": "2024-04-25T10:30:00.000Z"
  }
}
```

---

### 2. Get All Meals
**GET** `/diets`

Headers:
```
Authorization: Bearer <TOKEN>
```

Query Parameters:
```
?startDate=2024-04-18&endDate=2024-04-25
```

Response:
```json
{
  "success": true,
  "data": {
    "meals": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "mealName": "Breakfast",
        "calories": 350,
        "protein": 25,
        "carbs": 20,
        "fats": 15,
        "date": "2024-04-25T00:00:00.000Z"
      }
    ],
    "summary": {
      "totalCalories": 2000,
      "totalProtein": 150,
      "totalCarbs": 200,
      "totalFats": 80,
      "mealCount": 3
    }
  }
}
```

---

### 3. Delete Meal
**DELETE** `/diets/:id`

Headers:
```
Authorization: Bearer <TOKEN>
```

Response:
```json
{
  "success": true,
  "message": "Meal deleted successfully"
}
```

---

## 😴 Wellness Endpoints (Protected)

### 1. Add Wellness Entry
**POST** `/wellness`

Headers:
```
Authorization: Bearer <TOKEN>
Content-Type: application/json
```

Request:
```json
{
  "sleepHours": 7.5,
  "waterIntake": 2.5,
  "stressLevel": "low",
  "notes": "Felt great today!",
  "date": "2024-04-25"
}
```

Response:
```json
{
  "success": true,
  "message": "Wellness data added successfully",
  "wellness": {
    "_id": "507f1f77bcf86cd799439014",
    "user": "507f1f77bcf86cd799439011",
    "sleepHours": 7.5,
    "waterIntake": 2.5,
    "stressLevel": "low",
    "notes": "Felt great today!",
    "date": "2024-04-25T00:00:00.000Z",
    "createdAt": "2024-04-25T10:30:00.000Z"
  }
}
```

---

### 2. Get Wellness Data
**GET** `/wellness`

Headers:
```
Authorization: Bearer <TOKEN>
```

Query Parameters:
```
?startDate=2024-04-18&endDate=2024-04-25
```

Response:
```json
{
  "success": true,
  "data": {
    "wellnessData": [
      {
        "_id": "507f1f77bcf86cd799439014",
        "sleepHours": 7.5,
        "waterIntake": 2.5,
        "stressLevel": "low",
        "notes": "Felt great today!",
        "date": "2024-04-25T00:00:00.000Z"
      }
    ],
    "summary": {
      "avgSleep": "7.2",
      "totalWater": 17.5,
      "stressCount": {
        "low": 5,
        "medium": 2,
        "high": 0
      },
      "dataPoints": 7
    }
  }
}
```

---

### 3. Delete Wellness Entry
**DELETE** `/wellness/:id`

Headers:
```
Authorization: Bearer <TOKEN>
```

Response:
```json
{
  "success": true,
  "message": "Wellness data deleted successfully"
}
```

---

## 📋 Request/Response Codes

### Success Codes
- `200 OK` - Request successful
- `201 Created` - Resource created successfully

### Client Error Codes
- `400 Bad Request` - Invalid input data
- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - Resource not found

### Server Error Codes
- `500 Internal Server Error` - Server error

---

## 🔄 Common Query Parameters

### Date Filtering
```
GET /api/workouts?startDate=2024-04-18&endDate=2024-04-25
```

Both parameters are optional:
- `startDate`: ISO format (YYYY-MM-DD)
- `endDate`: ISO format (YYYY-MM-DD)

---

## 💡 Usage Examples

### Using cURL

#### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secure123",
    "height": 175,
    "weight": 70
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "secure123"
  }'
```

#### Get Profile (with token)
```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using JavaScript (Fetch)

```javascript
// Register
const registerResponse = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'secure123'
  })
});

// Get Profile (with token)
const token = localStorage.getItem('token');
const profileResponse = await fetch('http://localhost:5000/api/users/profile', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

### Using Axios (JavaScript)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Set token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Login
const loginResponse = await api.post('/auth/login', {
  email: 'john@example.com',
  password: 'secure123'
});

// Get Profile
const profileResponse = await api.get('/users/profile');
```

---

## 🔐 Notes on Security

- Always use HTTPS in production
- Never expose tokens in URLs
- Store tokens securely (localStorage for SPAs)
- Include token in Authorization header
- Tokens expire after JWT_EXPIRE duration (default: 7 days)
- Always validate input data on both client and server

---

## 📞 Error Handling

All endpoints may return errors in this format:

```json
{
  "success": false,
  "message": "Error description here"
}
```

Common error messages:
- "Please provide email and password"
- "Invalid email or password"
- "Email already registered"
- "No token provided"
- "Invalid or expired token"
- "User not found"
- "Workout not found"

---

**Happy Testing! 🚀**
