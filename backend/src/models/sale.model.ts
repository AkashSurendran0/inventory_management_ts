import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ISalesSchema extends Document {
    date:Date,
    productName:string,
    customerName:string,
    quantity:number,
    pricePerUnit:number,
    totalAmount:number
}

const salesSchema: Schema<ISalesSchema> = new Schema (
    {
        date:{
            type:Date,
            required:true
        },
        productName:{
            type:String,
            required:true
        },
        customerName:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        pricePerUnit:{
            type:Number,
            required:true
        },
        totalAmount:{
            type:Number,
            required:true
        }
    },
    {timestamps:true}
)

export const SalesModel: Model<ISalesSchema> = mongoose.model<ISalesSchema>('sales', salesSchema)