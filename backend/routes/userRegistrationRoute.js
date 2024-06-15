const router = require('express').Router();
let UserAccount = require('../models/userAccountModel');

// Registration route
router.route('/').post((req, res) => {
    const { username, email, password } = req.body;

    const newUser = new UserAccount({ 
        username, 
        email, 
        password,
        role: 0 // Default role for registered users
    });

    newUser.save()
        .then(() => res.json('User registered!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
