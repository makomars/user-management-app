// backend/generateSecret.js

const fs = require('fs');
const crypto = require('crypto');

const generateJwtSecret = () => {
  return crypto.randomBytes(32).toString('hex'); // Generates a 256-bit (32-byte) random string
};

// Generate the secret
const jwtSecret = generateJwtSecret();

// Write the secret to config.js
fs.writeFileSync('./config.js', `module.exports = { jwtSecret: '${jwtSecret}' };`);

console.log('JWT secret generated and saved to config.js.');
