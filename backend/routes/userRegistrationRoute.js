// backend/routes/userRegistrationRoute.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const UserAccount = require('../models/userAccountModel');

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user exists
    let user = await UserAccount.findOne({ username });

    if (user) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new UserAccount({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
