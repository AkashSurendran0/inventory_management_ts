import { inject, injectable } from "inversify";
import { IAddProduct } from "../../domain/services/IInventoryServices";
import { Inventory } from "../../domain/entity/Inventory";
import { TYPES } from "../../types";
import { IInventoryRepository } from "../../domain/repository/IInventoryRepository";
import { CreateError } from "../../utils/errorHandler.util";
import { STATUS_CODES } from "../../utils/statusCode.util";

@injectable()
export class AddProduct implements IAddProduct {

    constructor(
        @inject(TYPES.IInventoryRepository) private _inventoryRepository:IInventoryRepository
    ) {}

    async addProduct(data: { name: string; description: string; quantity: number; price: number; }): Promise<Inventory> {
        const result=await this._inventoryRepository.addProduct(data)
        if(!result.success){
            throw new CreateError(STATUS_CODES.FORBIDDEN, 'Product already exists')
        }
        return result.product!
    }

}