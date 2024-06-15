const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://192.168.0.34:3000'], // Allow both local and network origins
  methods: ['GET', 'POST'],
  credentials: true, // This allows the credentials (e.g., cookies) to be sent along with the request
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/user_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes (assuming these are correctly defined in your routes)
const userAccountRoute = require('./routes/userAccountRoute');
const userRegistrationRoute = require('./routes/userRegistrationRoute');
const userLoginRoute = require('./routes/userLoginRoute');

// Use the userRegistrationRoute for registration-related requests
app.use('/register', userRegistrationRoute);

// Use the userLoginRoute for login-related requests
app.use('/login', userLoginRoute);

// Mount the userAccountRoute at the root endpoint for user-related requests
app.use('/users', userAccountRoute);

// Mount the root route
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

// Catch-all route for 404 errors
app.use((req, res) => {
  res.status(404).send('404: Page not found');
});

// Start the server listening on localhost
app.listen(port, 'localhost', () => {
  console.log(`Server is running on port: ${port}`);
});
