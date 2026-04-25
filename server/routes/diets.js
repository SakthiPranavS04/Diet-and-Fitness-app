// Diet routes
const express = require('express');
const { addMeal, getMeals, deleteMeal } = require('../controllers/dietController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

/**
 * POST /api/diets
 * Add a new meal
 */
router.post('/', addMeal);

/**
 * GET /api/diets
 * Get all meals with optional date filtering
 */
router.get('/', getMeals);

/**
 * DELETE /api/diets/:id
 * Delete a meal
 */
router.delete('/:id', deleteMeal);

module.exports = router;
