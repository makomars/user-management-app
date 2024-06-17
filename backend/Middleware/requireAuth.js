const jwt = require('jsonwebtoken');
const config = require('../config');

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), config.jwtSecret);
    req.user = decoded; // Attach decoded user information to request object
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = requireAuth;
