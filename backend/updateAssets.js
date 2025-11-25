const mongoose = require('mongoose');
require('dotenv').config();

const Asset = require('./assets/Asset');

const updateAssets = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Update all assets that don't have approvalStatus set to 'approved'
    const result = await Asset.updateMany(
      { approvalStatus: { $ne: 'pending' } }, // Don't update pending assets
      { $set: { approvalStatus: 'approved' } }
    );

    console.log(`✅ Updated ${result.modifiedCount} assets to approved status`);
    
    // Show total counts
    const approved = await Asset.countDocuments({ approvalStatus: 'approved' });
    const pending = await Asset.countDocuments({ approvalStatus: 'pending' });
    const rejected = await Asset.countDocuments({ approvalStatus: 'rejected' });
    
    console.log(`\nAsset Status Summary:`);
    console.log(`Approved: ${approved}`);
    console.log(`Pending: ${pending}`);
    console.log(`Rejected: ${rejected}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error updating assets:', error);
    process.exit(1);
  }
};

updateAssets();
