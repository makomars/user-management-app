// backend/Migrations/initializeDatabase.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { mongoURI } = require('../config'); // Importing mongoURI from config.js

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', async () => {
  console.log('Connected to MongoDB');

  // Define your schema and models here, create collections if necessary

  // Example: Create a schema and model
  const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: Number
  });

  const User = mongoose.model('useraccounts', userSchema);

  // Example: Create initial data with hashed password
  const salt = await bcrypt.genSalt(10); // Generate salt for hashing
  const hashedPassword = await bcrypt.hash('jana', salt); // Hash the password 'jana'

  const initialUser = new User({
    username: 'jana',
    email: 'jana@google.com',
    password: hashedPassword, // Store the hashed password
    role: 1
  });

  try {
    // Save initial data
    await initialUser.save();
    console.log('Initial user created:', initialUser);

    // More initialization logic if needed

    db.close(); // Close connection after tasks are done
    console.log('Database initialization complete.');
  } catch (error) {
    console.error('Error initializing database:', error);
    db.close();
  }
});
