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

    async getAllProducts(query: string | undefined): Promise<Inventory[]> {
        let products
        if(query){
            products=await this._inventoryRepository.findProductsByQuery(query)
        }else{
            products=await this._inventoryRepository.findAllProducts()
        }
        return products
    }

}