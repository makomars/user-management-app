// adminrole.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserAccount = require('../models/userAccountModel'); // Adjusted path

const mongoURI = 'mongodb://localhost:27017/user_management'; // Replace with your MongoDB URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    runMigration();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

async function runMigration() {
  try {
    const username = 'jana';
    const email = 'jana@gmail.com';
    const password = 'jana';
    const role = 1;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserAccount({
      username,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();
    console.log('User created successfully:', newUser);
    mongoose.connection.close(); // Close the connection after the operation
  } catch (error) {
    console.error('Error creating user:', error);
  }
}
