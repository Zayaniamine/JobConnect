const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4000;
const connectDB = require('./config/database');
const logger = require('./middlewares/logger');
const { loggers,logEvents } = require('./middlewares/loggerReq')
const errorHandler=require('./middlewares/Errorhandler')

app.use(loggers)
// Middleware
app.use(express.json());
app.use(cors());


// Connect to MongoDB
connectDB();

app.use(errorHandler)
// Routes
app.use('/', require('./routes/authroute'));

// Start the server
app.listen(PORT, () =>
  logger.info(`Server is Running on port ${PORT}`),
  console.log(`Server is Running on port ${PORT}`)
);

