const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('./profileController');
const authMiddleware = require('./authMiddleware');

// Get user profile by ID (public)
router.get('/:id', getProfile);

// Update own profile (protected)
router.put('/', authMiddleware, updateProfile);

module.exports = router;
