const mongoose = require('mongoose');
require('dotenv').config();
const { logger,logEvents } = require('../middlewares/loggerReq')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
  mongoose.connection.once('open',()=>{
    console.log('connected to MongoDB')

app.listen(PORT,()=>console.log(`server running on port ${PORT}`))
})
  mongoose.connection.on('error',err =>{
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
};

module.exports = connectDB;