const express = require('express');
const router = express.Router();
const { getAssets, getAssetById, seedAssets } = require('./assetController');

router.get('/', getAssets);
router.get('/seed', seedAssets); // Dev only
router.get('/:id', getAssetById);

module.exports = router;
