const router = require('express').Router();
const UserAccount = require('../models/userAccountModel');

router.route('/').post((req, res) => {
    const { username, password } = req.body;

    UserAccount.findOne({ username })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }
            if (user.password !== password) {
                return res.status(401).json({ error: 'Incorrect password' });
            }

            // Send role information in the response
            res.json({
                message: user.role === 1 ? 'Admin logged in' : 'Registered user logged in',
                token: 'your_generated_token', // Add token generation logic here
                role: user.role
            });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
