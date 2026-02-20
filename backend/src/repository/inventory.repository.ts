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

}