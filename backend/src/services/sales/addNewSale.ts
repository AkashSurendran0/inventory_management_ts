import { inject, injectable } from "inversify";
import { Inventory } from "../../domain/entity/Inventory";
import { Sale } from "../../domain/entity/Sale";
import { IAddNewSale } from "../../domain/services/ISalesService";
import { TYPES } from "../../types";
import { IInventoryRepository } from "../../domain/repository/IInventoryRepository";
import { ISalesRepository } from "../../domain/repository/ISalesRepository";

@injectable()
export class AddNewSale implements IAddNewSale {

    constructor(
        @inject(TYPES.IInventoryRepository) private _inventoryRepository:IInventoryRepository,
        @inject(TYPES.ISalesRepository) private _salesRepository:ISalesRepository
    ){ }

    async addNewSale(data: { date: Date; productName: string; customerName: string; quantity: number; pricePerUnit: number; totalAmount: number; productId?: string; }): Promise<{ product: Inventory; sale: Sale; }> {
        const product=await this._inventoryRepository.decreaseQuantity(data.productId!, data.quantity)
        const sale=await this._salesRepository.addSale(data)

        return {product, sale}
    }

}