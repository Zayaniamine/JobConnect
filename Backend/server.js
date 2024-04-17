const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4000;
const connectDB = require('./config/database');
const logger = require('./logger');

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/', require('./routes/authroute'));

// Start the server
app.listen(PORT, () =>
  logger.info(`Server is working on port ${PORT}`)
);
