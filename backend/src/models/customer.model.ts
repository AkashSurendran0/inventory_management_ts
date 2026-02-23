import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICustomer extends Document {
    name:string,
    normalizedName:string,
    address:string,
    phone:string,
    isActive:boolean,
}

const customerSchema: Schema<ICustomer> = new Schema (
    {
        name:{
            type:String,
            required:true
        },
        normalizedName:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        isActive:{
            type:Boolean,
            default:true
        },
    },
    {timestamps:true}
)

export const CustomerModel: Model<ICustomer> = mongoose.model<ICustomer>('customerss', customerSchema)