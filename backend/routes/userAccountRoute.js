// backend/routes/userAccountRoute.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserAccount = require('../models/userAccountModel');
const config = require('../config');

// Route to login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await UserAccount.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: '1h' // Token expires in 1 hour
    });

    // Send token as response
    res.json({ token, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
