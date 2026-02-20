import { inject, injectable } from "inversify";
import { IEditProduct } from "../../domain/services/IInventoryServices";
import { Inventory } from "../../domain/entity/Inventory";
import { CreateError } from "../../utils/errorHandler.util";
import { STATUS_CODES } from "../../utils/statusCode.util";
import { TYPES } from "../../types";
import { IInventoryRepository } from "../../domain/repository/IInventoryRepository";

@injectable()
export class EditProduct implements IEditProduct {

    constructor(
        @inject(TYPES.IInventoryRepository) private _inventoryRepository:IInventoryRepository
    ) {}

    async editProduct(data: { name: string; description: string; quantity: number; price: number; }, id: string): Promise<Inventory> {
        const result=await this._inventoryRepository.editProduct(data, id)
        if(!result.success){
            throw new CreateError(STATUS_CODES.FORBIDDEN, 'Product already exists')
        }
        return result.product!
    }

}