require('dotenv').config()     ///.env file
const express=require("express")
const app=express()
const PORT=process.env.PORT || 4000
const path=require("path")



const connectDB =require('./config/DBConnect')
const mongoose=require('mongoose')
 
app.use(express.json())

app.use(connectDB)
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
