const express = require('express');
const router = express.Router();
const { getAssets, getAssetById, seedAssets } = require('./assetController');

router.get('/', getAssets);
router.get('/seed', seedAssets);
router.get('/:id', getAssetById);

module.exports = router;
