const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4000;
const connectDB = require('./config/database');
const path=require("path")
const logger = require('./middlewares/logger');
const { loggers,logEvents } = require('./middlewares/loggerReq')
const errorHandler=require('./middlewares/Errorhandler')
const authroutes = require('./routes/authroute');
const employer=require('./routes/Employer')
const jobRoutes = require('./routes/jobRoutes');
const mongoose = require('mongoose');
app.use(loggers)
// Middleware
app.use(express.json());
app.use(cors());


// Connect to MongoDB
connectDB();

app.use('/uploads', express.static(path.join(__dirname, 'config', 'uploads')));

app.use(errorHandler)
// Routes
app.use('/auth', authroutes);
app.use('/employer', employer);
app.use('/api/jobs', jobRoutes);
mongoose.connection.once('open',()=>{


app.listen(PORT,()=> 
logger.info(`Server is Running on port ${PORT}`),
console.log(`Server is Running on port ${PORT}`))
})

mongoose.connection.on('error',err =>{
  console.log(err)
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})



