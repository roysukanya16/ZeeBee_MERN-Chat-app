const express = require('express');
const connectDB = require('./config/db');
require('colors');
require('dotenv').config()
const userRoutes = require("./Routes/userRoutes")
const chatRoutes = require("./Routes/chatRoutes")
const messageRoutes = require("./Routes/messageRoutes")

const {notFound,errorHandle}=require('./middleware/errorMiddleware')


connectDB()
const app =express();

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Api is on");
})


app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)


// app.use(notFound())
// app.use(errorHandle())

const PORT = process.env.PORT || 5000;

app.listen(5000,
    console.log(`Server is on ${PORT}`.yellow.bold))