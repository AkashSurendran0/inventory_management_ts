import express from "express";
import dotenv from 'dotenv'
import { connectDB } from "./config/connectDb.config";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config()

const app=express()

connectDB()

app.use(express.json())

const PORT=process.env.PORT

app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
})