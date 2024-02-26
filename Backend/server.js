require('dotenv').config()     ///.env file
const express=require('express')
const app=express()
const PORT=process.env.PORT || 4000
const path=require('path')
const { logger,logEvents } = require('./middleware/logger')
const errorHandler=require('./middleware/errorhandler')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const corsOptions=require('./config/corsOptions')

const connectDB =require('./config/DBConnect')
const mongoose=require('mongoose')

connectDB()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json()) ///for middleware lesson


app.use(cookieParser())

app.use(errorHandler)

mongoose.connection.once('open',()=>{
    console.log('connected to MongoDB')

app.listen(PORT,()=>console.log(`server running on port ${PORT}`))
})

mongoose.connection.on('error',err =>{
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})