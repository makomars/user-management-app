const router = require('express').Router();
const UserAccount = require('../models/userAccountModel');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await UserAccount.find();
        res.json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get user by username
router.get('/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const user = await UserAccount.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update user by username
router.put('/:username', async (req, res) => {
    const username = req.params.username;
    const { email, password } = req.body;
    try {
        const updatedUser = await UserAccount.findOneAndUpdate(
            { username },
            { email, password },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete user by username
router.delete('/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const deletedUser = await UserAccount.findOneAndDelete({ username });
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
