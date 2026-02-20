import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_ATLAS_URL!)
        console.log('Mongodb Connected')
    } catch (error) {
        console.log('Database connection error', error)
    }
}
