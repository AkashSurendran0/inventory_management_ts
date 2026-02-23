import { inject, injectable } from "inversify";
import { IDeleteProduct } from "../../domain/services/IInventoryServices";
import { TYPES } from "../../types";
import { IInventoryRepository } from "../../domain/repository/IInventoryRepository";
import { Inventory } from "../../domain/entity/Inventory";

@injectable()
export class DeleteProduct implements IDeleteProduct {

    constructor(
        @inject(TYPES.IInventoryRepository) private _inventoryRepository:IInventoryRepository
    ) {}

    async deleteProduct(id: string): Promise<Inventory> {
        const result=await this._inventoryRepository.deleteProduct(id)
        return result
    }

}