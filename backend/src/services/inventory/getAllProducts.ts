import { inject, injectable } from "inversify";
import { IGetAllProducts } from "../../domain/services/IInventoryServices";
import { Inventory } from "../../domain/entity/Inventory";
import { TYPES } from "../../types";
import { IInventoryRepository } from "../../domain/repository/IInventoryRepository";

@injectable()
export class GetAllProducts implements IGetAllProducts {

    constructor(
        @inject(TYPES.IInventoryRepository) private _inventoryRepository:IInventoryRepository
    ){}

    async getAllProducts(query: string | undefined, page: number, limit: number): Promise<{products: Inventory[], totalPages: number}> {
        let products
        if(query){
            products=await this._inventoryRepository.findProductsByQuery(query, page, limit)
        }else{
            products=await this._inventoryRepository.findAllProducts(page, limit)
        }
        return products
    }

}