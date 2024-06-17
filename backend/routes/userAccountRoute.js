const express = require('express');
const router = express.Router();
const requireAuth = require('../Middleware/requireAuth'); // Import your requireAuth middleware
const UserAccount = require('../models/userAccountModel'); // Adjust path as needed

// Route to get all users (Read operation)
router.get('/', requireAuth, async (req, res) => {
  try {
    const users = await UserAccount.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get a specific user by username (Read operation)
router.get('/:username', requireAuth, async (req, res) => {
  const username = req.params.username;
  try {
    const user = await UserAccount.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by username:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to register a new user (Create operation)
router.post('/register', requireAuth, async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const newUser = new UserAccount({
      username,
      email,
      password,
      role
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to update a user by username (Update operation)
router.put('/:username', requireAuth, async (req, res) => {
  const username = req.params.username;
  const { email, role } = req.body;

  try {
    const updatedUser = await UserAccount.findOneAndUpdate({ username }, { email, role }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to delete a user by username (Delete operation)
router.delete('/:username', requireAuth, async (req, res) => {
  const username = req.params.username;

  try {
    const deletedUser = await UserAccount.findOneAndDelete({ username });
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
