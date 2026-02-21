import express from "express";
import dotenv from 'dotenv'
import { connectDB } from "./config/connectDb.config";
import { errorHandler } from "./middleware/error.middleware";
import v1Routes from './routes/v1.routes'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

connectDB()
const app=express()
app.use(cors({
    origin:true,
    credentials:true,
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["set-cookie"]
}));
app.use(cookieParser())
app.use(express.json())
app.use('/v1/', v1Routes)

app.use(errorHandler)

const PORT=process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
})