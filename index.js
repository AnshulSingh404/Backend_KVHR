const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config');
const authRoutes = require('./routes/authRoutes');
const googleAuthRoutes = require('./routes/googleAuthRoutes');

// Set up MongoDB connection
mongoose.connect(config.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

const app = express();

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/auth', authRoutes);
app.use('/auth/google', googleAuthRoutes);


// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
