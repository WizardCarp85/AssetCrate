const express = require('express');
const router = express.Router();
const {
    getDeveloperDashboard,
    getCreatorDashboard,
    getAdminDashboard,
    approveAsset,
    getAllUsers,
    updateUserRole,
    getAdminAssets,
    getPendingAssets
} = require('./dashboardController');
const authMiddleware = require('./authMiddleware');

// Middleware to check if user is admin
const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin only.'
        });
    }
    next();
};

// Dashboard routes (all protected)
router.get('/developer', authMiddleware, getDeveloperDashboard);
router.get('/creator', authMiddleware, getCreatorDashboard);
router.get('/admin', authMiddleware, adminMiddleware, getAdminDashboard);

// Admin-only routes
router.put('/admin/asset/:assetId/approve', authMiddleware, adminMiddleware, approveAsset);
router.get('/admin/users', authMiddleware, adminMiddleware, getAllUsers);
router.put('/admin/user/:userId/role', authMiddleware, adminMiddleware, updateUserRole);
router.get('/admin/assets', authMiddleware, adminMiddleware, getAdminAssets);
router.get('/admin/pending-assets', authMiddleware, adminMiddleware, getPendingAssets);

module.exports = router;
