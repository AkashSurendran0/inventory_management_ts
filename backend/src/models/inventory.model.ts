import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IInventory extends Document {
    name:string,
    normalizedName:string,
    description:string,
    quantity:number,
    price:number,
    isActive:boolean,
    createdAt:Date
}

const inventorySchema:Schema<IInventory> = new Schema (
    {
        name:{
            type:String,
            required:true
        },
        normalizedName:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        isActive:{
            type:Boolean,
            default:true
        }
    },
    {timestamps:true}
)

export const InventoryModel: Model<IInventory> = mongoose.model<IInventory>('inventory', inventorySchema)