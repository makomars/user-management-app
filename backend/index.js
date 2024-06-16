// backend/index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userLoginRoute = require('./routes/userLoginRoute');
const userRegistrationRoute = require('./routes/userRegistrationRoute');
const profileRoute = require('./routes/profile');
const userAccountRoute = require('./routes/userAccountRoute');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000'], // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/user_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Routes
app.use('/api/login', userLoginRoute);
app.use('/api/register', userRegistrationRoute);
app.use('/api/profile', profileRoute);
app.use('/api/users', userAccountRoute);

// Catch-all route for 404 errors
app.use((req, res) => {
  res.status(404).send('404: Page not found');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
