const mongoose = require('mongoose');
const UserAccount = require('../models/userAccountModel'); // Use the correct path to your model

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/user_management', {
  // useNewUrlParser and useUnifiedTopology are no longer needed
}).then(() => {
  console.log('MongoDB connected');
  
  // Add 'role' field to existing documents
  UserAccount.updateMany(
    { role: { $exists: false } }, // Only update documents where 'role' does not exist
    { $set: { role: 0 } } // Default role to 0 (registered user)
  ).then(result => {
    console.log(`${result.modifiedCount} documents were updated.`);
    mongoose.connection.close(); // Close the connection after the update
  }).catch(err => {
    console.error('Error updating documents:', err);
    mongoose.connection.close(); // Ensure the connection is closed in case of an error
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
