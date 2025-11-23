const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'AssetCrate API is running',
    timestamp: new Date().toISOString()
  });
});

// TODO: MongoDB connection will be added here
// TODO: Routes will be imported and used here

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AssetCrate API running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
