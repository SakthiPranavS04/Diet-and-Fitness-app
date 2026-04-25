// Wellness routes
const express = require('express');
const {
  addWellness,
  getWellness,
  deleteWellness,
} = require('../controllers/wellnessController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

/**
 * POST /api/wellness
 * Add wellness data
 */
router.post('/', addWellness);

/**
 * GET /api/wellness
 * Get wellness data with optional date filtering
 */
router.get('/', getWellness);

/**
 * DELETE /api/wellness/:id
 * Delete wellness data
 */
router.delete('/:id', deleteWellness);

module.exports = router;
