// Workout routes
const express = require('express');
const { addWorkout, getWorkouts, deleteWorkout } = require('../controllers/workoutController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

/**
 * POST /api/workouts
 * Add a new workout
 */
router.post('/', addWorkout);

/**
 * GET /api/workouts
 * Get all workouts with optional date filtering
 */
router.get('/', getWorkouts);

/**
 * DELETE /api/workouts/:id
 * Delete a workout
 */
router.delete('/:id', deleteWorkout);

module.exports = router;
