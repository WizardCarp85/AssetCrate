const Asset = require('./Asset');
const User = require('../user/User');
const seedAssets = require('./seedData');

exports.getAssets = async (req, res) => {
  try {
    let query;
    const reqQuery = { ...req.query };
    
    const removeFields = ['select', 'sort', 'page', 'limit', 'search'];

    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    let mongoQuery = JSON.parse(queryStr);

    mongoQuery.approvalStatus = 'approved';

    if (req.query.search) {
      mongoQuery.title = { $regex: req.query.search, $options: 'i' };
    }

    query = Asset.find(mongoQuery);

    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Asset.countDocuments(mongoQuery);

    query = query.skip(startIndex).limit(limit);

    const assets = await query;

    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: assets.length,
      total,
      pagination,
      data: assets
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }

    res.status(200).json({
      success: true,
      data: asset
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.uploadAsset = async (req, res) => {
  try {
    const { title, description, category, price, imageUrl, fileUrl, tags } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);

    const asset = await Asset.create({
      title,
      description,
      category,
      price: price || 0,
      imageUrl,
      fileUrl,
      tags: tags || [],
      author: user.username,
      creatorId: userId,
      approvalStatus: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Asset uploaded successfully. Pending admin approval.',
      data: asset
    });
  } catch (err) {
    console.error('Upload asset error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.deleteAsset = async (req, res) => {
  try {
    const assetId = req.params.id;
    const userId = req.user.userId;
    const userRole = req.user.role;

    const asset = await Asset.findById(assetId);

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found'
      });
    }

    if (asset.creatorId) {
      if (asset.creatorId.toString() !== userId && userRole !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to delete this asset'
        });
      }
    } else {
      if (userRole !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Only admins can delete seeded assets'
        });
      }
    }

    await Asset.findByIdAndDelete(assetId);

    res.json({
      success: true,
      message: 'Asset deleted successfully'
    });
  } catch (err) {
    console.error('Delete asset error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.updateAsset = async (req, res) => {
  try {
    const assetId = req.params.id;
    const userId = req.user.userId;
    const userRole = req.user.role;
    const { title, description, category, price, imageUrl, fileUrl, tags } = req.body;

    let asset = await Asset.findById(assetId);

    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }

    if (asset.creatorId) {
        if (asset.creatorId.toString() !== userId && userRole !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this asset'
            });
        }
    } else {
        if (userRole !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Only admins can update seeded assets'
            });
        }
    }

    const updateData = {
        title: title || asset.title,
        description: description || asset.description,
        category: category || asset.category,
        price: price !== undefined ? price : asset.price,
        imageUrl: imageUrl || asset.imageUrl,
        fileUrl: fileUrl || asset.fileUrl,
        tags: tags || asset.tags
    };

    asset = await Asset.findByIdAndUpdate(assetId, updateData, {
        new: true,
        runValidators: true
    });

    res.json({
        success: true,
        message: 'Asset updated successfully',
        data: asset
    });

  } catch (err) {
    console.error('Update asset error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const assetId = req.params.id;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    const asset = await Asset.findById(assetId);

    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }

    const isFavorited = user.favorites.includes(assetId);

    if (isFavorited) {

      user.favorites = user.favorites.filter(id => id.toString() !== assetId);
    } else {

      user.favorites.push(assetId);
    }

    await user.save();

    res.json({
      success: true,
      isFavorited: !isFavorited,
      message: isFavorited ? 'Removed from favorites' : 'Added to favorites'
    });
  } catch (err) {
    console.error('Toggle favorite error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


exports.recordDownload = async (req, res) => {
  try {
    const assetId = req.params.id;
    const userId = req.user.userId;

    const asset = await Asset.findById(assetId);
    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }

    asset.downloads += 1;
    await asset.save();

    const user = await User.findById(userId);
    user.downloads.push({
      assetId,
      downloadedAt: new Date()
    });
    await user.save();

    res.json({
      success: true,
      message: 'Download recorded',
      downloads: asset.downloads
    });
  } catch (err) {
    console.error('Record download error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.incrementViews = async (req, res) => {
  try {
    const assetId = req.params.id;

    const asset = await Asset.findById(assetId);
    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }

    asset.views += 1;
    await asset.save();

    res.json({
      success: true,
      views: asset.views
    });
  } catch (err) {
    console.error('Increment views error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.seedAssets = async (req, res) => {
  try {
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      return res.status(404).json({ 
        success: false, 
        message: 'Admin user not found. Please create an admin user first.' 
      });
    }

    await Asset.deleteMany();

    const assetsWithAuthor = seedAssets.map(asset => ({
      ...asset,
      author: admin.username,
      creatorId: admin._id
    }));

    await Asset.create(assetsWithAuthor);

    res.status(201).json({
      success: true,
      message: 'Assets seeded successfully',
      data: assetsWithAuthor
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.addComment = async (req, res) => {
  try {
    const assetId = req.params.id;
    const userId = req.user.userId;
    const { text, rating } = req.body;

    if (!text || !rating) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both text and rating'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const asset = await Asset.findById(assetId);
    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found'
      });
    }

    const comment = {
      userId: userId,
      username: user.username,
      avatar: user.avatar || '',
      text: text,
      rating: rating,
      createdAt: new Date()
    };

    asset.comments.push(comment);

    const totalRating = asset.comments.reduce((sum, c) => sum + c.rating, 0);
    asset.rating = totalRating / asset.comments.length;

    await asset.save();

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: comment
    });
  } catch (err) {
    console.error('Add comment error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id: assetId, commentId } = req.params;
    const userId = req.user.userId;
    const userRole = req.user.role;

    const asset = await Asset.findById(assetId);
    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found'
      });
    }

    const comment = asset.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    if (comment.userId.toString() !== userId && userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this comment'
      });
    }

    comment.deleteOne();

    if (asset.comments.length > 0) {
      const totalRating = asset.comments.reduce((sum, c) => sum + c.rating, 0);
      asset.rating = totalRating / asset.comments.length;
    } else {
      asset.rating = 5;
    }

    await asset.save();

    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (err) {
    console.error('Delete comment error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

