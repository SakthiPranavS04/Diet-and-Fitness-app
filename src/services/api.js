// API service - Centralized Axios configuration and API calls
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to every request if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ========== AUTH SERVICES ==========
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// ========== USER SERVICES ==========
export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
};

// ========== WORKOUT SERVICES ==========
export const workoutService = {
  addWorkout: (data) => api.post('/workouts', data),
  getWorkouts: (params) => api.get('/workouts', { params }),
  deleteWorkout: (id) => api.delete(`/workouts/${id}`),
};

// ========== DIET SERVICES ==========
export const dietService = {
  addMeal: (data) => api.post('/diets', data),
  getMeals: (params) => api.get('/diets', { params }),
  deleteMeal: (id) => api.delete(`/diets/${id}`),
};

// ========== WELLNESS SERVICES ==========
export const wellnessService = {
  addWellness: (data) => api.post('/wellness', data),
  getWellness: (params) => api.get('/wellness', { params }),
  deleteWellness: (id) => api.delete(`/wellness/${id}`),
};

export default api;
