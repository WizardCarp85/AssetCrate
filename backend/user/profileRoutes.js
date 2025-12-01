const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('./profileController');
const authMiddleware = require('./authMiddleware');

router.get('/:id', getProfile);

router.put('/', authMiddleware, updateProfile);

module.exports = router;
