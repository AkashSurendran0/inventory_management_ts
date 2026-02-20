import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
    email:string,
    password:string,
    createdAt:Date
}

const userSchema:Schema<IUser> = new Schema (
    {
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }
    },
    {timestamps:true}
)

export const UserModel: Model<IUser> = mongoose.model<IUser>('users', userSchema)