// backend/Middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const UserAccount = require('../models/userAccountModel');
const config = require('../config');

const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      // Verify the JWT token
      const decodedToken = jwt.verify(token.split(' ')[1], config.jwtSecret); // Extract the token from 'Bearer <token>'

      // Fetch user from database using the decoded token
      const user = await UserAccount.findById(decodedToken.userId);

      if (!user) {
        throw new Error('User not found');
      }

      // Attach user object to request for further use
      req.user = user;
      next();
    } catch (err) {
      console.error('JWT verification error:', err);
      res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = requireAuth;
