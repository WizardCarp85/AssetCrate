const express = require('express');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Server running on port 3000');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
