import { injectable } from "inversify";
import { IInventoryRepository } from "../domain/repository/IInventoryRepository";
import { Inventory } from "../domain/entity/Inventory";
import { InventoryModel } from "../models/inventory.model";

@injectable()
export class InventoryRepository implements IInventoryRepository {

    async findAllProducts(): Promise<Inventory[]> {
        const products=await InventoryModel.find()

        return products.map(product => 
            new Inventory (
                String(product._id),
                product.name,
                product.normalizedName,
                product.description,
                product.quantity,
                product.price,
                product.createdAt
            )
        )
    }

    async findProductsByQuery(query: string): Promise<Inventory[]> {
        const products=await InventoryModel.find({
            $or:[
                {normalizedName:{$regex:query, $options:'i'}},
                {description:{$regex:query, $options:'i'}}
            ]
        })

        return products.map(product => 
            new Inventory (
                String(product._id),
                product.name,
                product.normalizedName,
                product.description,
                product.quantity,
                product.price,
                product.createdAt
            )
        )
    }

    async addProduct(data: { name: string; description: string; quantity: number; price: number; }): Promise<{ success: boolean; product?: Inventory; }> {
        let existingProduct=await InventoryModel.findOne({normalizedName:data.name.toLowerCase()})
        if(existingProduct) return {success:false}
        const newProduct = await InventoryModel.insertOne({
            name:data.name,
            normalizedName:data.name.toLowerCase(),
            description:data.description,
            quantity:data.quantity,
            price:data.price
        })
        const product = new Inventory (
            String(newProduct._id),
            newProduct.name,
            newProduct.normalizedName,
            newProduct.description,
            newProduct.quantity,
            newProduct.price,
            newProduct.createdAt
        )
        return {success:true, product}
    }

    async editProduct(data: { name: string; description: string; quantity: number; price: number; }, id: string): Promise<{ success: boolean; product?: Inventory; }> {
        let existingProduct=await InventoryModel.findOne({
            normalizedName:data.name.toLowerCase(),
            _id: { $ne: id }
        })
        if(existingProduct) return {success:false}
        const newProduct = await InventoryModel.findByIdAndUpdate(
            id,
            {
                $set:{
                    name:data.name,
                    normalizedName:data.name.toLowerCase(),
                    description:data.description,
                    quantity:data.quantity,
                    price:data.price
                }
            },
            { new: true }
        )
        const product=new Inventory (
            String(newProduct!._id),
            newProduct!.name,
            newProduct!.normalizedName,
            newProduct!.description,
            newProduct!.quantity,
            newProduct!.price,
            newProduct!.createdAt
        )

        return {success:true, product}
    }

}