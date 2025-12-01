const express = require('express');
const router = express.Router();
const {
  getAssets,
  getAssetById,
  uploadAsset,
  toggleFavorite,
  recordDownload,
  incrementViews,
  seedAssets,
  deleteAsset,
  updateAsset,
  addComment,
  deleteComment
} = require('./assetController');
const authMiddleware = require('../user/authMiddleware');

// Public routes
router.get('/', getAssets);
router.get('/:id', getAssetById);
router.post('/seed', seedAssets);
router.post('/:id/view', incrementViews);

// Protected routes
router.post('/', authMiddleware, uploadAsset);
router.put('/:id', authMiddleware, updateAsset);
router.delete('/:id', authMiddleware, deleteAsset);
router.post('/:id/favorite', authMiddleware, toggleFavorite);
router.post('/:id/download', authMiddleware, recordDownload);
router.post('/:id/comments', authMiddleware, addComment);
router.delete('/:id/comments/:commentId', authMiddleware, deleteComment);

module.exports = router;
