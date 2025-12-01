const User = require('./User');
const Asset = require('../assets/Asset');


exports.getDeveloperDashboard = async (req, res) => {
    try {
        const userId = req.user.userId;
        
        const user = await User.findById(userId)
            .populate('favorites')
            .populate('downloads.assetId');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const stats = {
            totalDownloads: user.downloads.length,
            totalFavorites: user.favorites.length
        };

        const recentDownloads = user.downloads
            .sort((a, b) => b.downloadedAt - a.downloadedAt)
            .slice(0, 10)
            .map(d => d.assetId);

        res.json({
            success: true,
            data: {
                stats,
                favorites: user.favorites,
                recentDownloads
            }
        });
    } catch (error) {
        console.error('Get developer dashboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

exports.getCreatorDashboard = async (req, res) => {
    try {
        const userId = req.user.userId;

        const uploadedAssets = await Asset.find({ creatorId: userId });

        const stats = {
            totalUploads: uploadedAssets.length,
            totalDownloads: uploadedAssets.reduce((sum, asset) => sum + asset.downloads, 0),
            totalViews: uploadedAssets.reduce((sum, asset) => sum + asset.views, 0),
            pendingApproval: uploadedAssets.filter(a => a.approvalStatus === 'pending').length,
            approved: uploadedAssets.filter(a => a.approvalStatus === 'approved').length,
            rejected: uploadedAssets.filter(a => a.approvalStatus === 'rejected').length
        };

        res.json({
            success: true,
            data: {
                stats,
                assets: uploadedAssets
            }
        });
    } catch (error) {
        console.error('Get creator dashboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

exports.getAdminDashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalAssets = await Asset.countDocuments({ approvalStatus: 'approved' }); // Only count approved assets
        const pendingAssets = await Asset.find({ approvalStatus: 'pending' });
        
        const usersByRole = await User.aggregate([
            { $group: { _id: '$role', count: { $sum: 1 } } }
        ]);

        const stats = {
            totalUsers,
            totalAssets,
            pendingApprovals: pendingAssets.length,
            usersByRole: usersByRole.reduce((acc, item) => {
                acc[item._id] = item.count;
                return acc;
            }, {})
        };

        const recentUsers = await User.find()
            .select('-password')
            .sort({ createdAt: -1 })
            .limit(10);

        const allAssets = await Asset.find()
            .sort({ createdAt: -1 })
            .limit(20); 

        res.json({
            success: true,
            data: {
                stats,
                pendingAssets,
                recentUsers,
                allAssets
            }
        });
    } catch (error) {
        console.error('Get admin dashboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

exports.approveAsset = async (req, res) => {
  try {
    const { assetId } = req.params;
    const { status, rejectionReason } = req.body; 

    const updateData = { approvalStatus: status };
    
    if (status === 'rejected' && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }

    if (status === 'approved') {
      updateData.rejectionReason = '';
    }

    const asset = await Asset.findByIdAndUpdate(
      assetId,
      updateData,
      { new: true }
    );

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found'
      });
    }

    res.json({
      success: true,
      message: `Asset ${status}`,
      data: asset
    });
  } catch (error) {
    console.error('Approve asset error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        
        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

exports.updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { role },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'User role updated',
            data: user
        });
    } catch (error) {
        console.error('Update user role error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

exports.getAdminAssets = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 8;
        const sortParam = req.query.sort || 'newest';
        const startIndex = (page - 1) * limit;

        let sort = { createdAt: -1 };
        if (sortParam === 'oldest') sort = { createdAt: 1 };
        if (sortParam === 'a-z') sort = { title: 1 };
        if (sortParam === 'z-a') sort = { title: -1 };
        if (sortParam === 'downloads') sort = { downloads: -1 };
        if (sortParam === 'rating') sort = { rating: -1 };

        const total = await Asset.countDocuments();
        
        const assets = await Asset.find()
            .sort(sort)
            .skip(startIndex)
            .limit(limit);

        res.json({
            success: true,
            count: assets.length,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            data: assets
        });
    } catch (error) {
        console.error('Get admin assets error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

exports.getPendingAssets = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 8;
        const sortParam = req.query.sort || 'newest';
        const startIndex = (page - 1) * limit;

        let sort = { createdAt: -1 };
        if (sortParam === 'oldest') sort = { createdAt: 1 };
        if (sortParam === 'a-z') sort = { title: 1 };
        if (sortParam === 'z-a') sort = { title: -1 };

        const query = { approvalStatus: 'pending' };
        const total = await Asset.countDocuments(query);
        
        const assets = await Asset.find(query)
            .sort(sort)
            .skip(startIndex)
            .limit(limit);

        res.json({
            success: true,
            count: assets.length,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            data: assets
        });
    } catch (error) {
        console.error('Get pending assets error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
