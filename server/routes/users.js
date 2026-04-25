// User routes
const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

/**
 * GET /api/users/profile
 * Get user profile
 */
router.get('/profile', getProfile);

/**
 * PUT /api/users/profile
 * Update user profile
 */
router.put('/profile', updateProfile);

module.exports = router;
