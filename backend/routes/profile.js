// backend/routes/profile.js

const express = require('express');
const router = express.Router();
const requireAuth = require('../Middleware/authMiddleware');

// GET /profile
router.get('/', requireAuth, async (req, res) => {
  // Assuming you want to fetch profile data for the authenticated user
  const user = req.user; // User object attached by authMiddleware

  // Example response
  res.status(200).json({
    username: user.username,
    email: user.email,
    role: user.role
    // Add more fields as needed
  });
});

module.exports = router;
