import { inject, injectable } from "inversify";
import { Inventory } from "../../domain/entity/Inventory";
import { Sale } from "../../domain/entity/Sale";
import { IAddNewSale } from "../../domain/services/ISalesService";
import { TYPES } from "../../types";
import { IInventoryRepository } from "../../domain/repository/IInventoryRepository";
import { ISalesRepository } from "../../domain/repository/ISalesRepository";
import { ICustomerRepository } from "../../domain/repository/ICustomerRepository";

@injectable()
export class AddNewSale implements IAddNewSale {

    constructor(
        @inject(TYPES.IInventoryRepository) private _inventoryRepository:IInventoryRepository,
        @inject(TYPES.ISalesRepository) private _salesRepository:ISalesRepository,
        @inject(TYPES.ICustomerRepository) private _customerRepository:ICustomerRepository
    ){ }
        
    async addNewSale(data: { date: Date; productId: string; customerId: string; quantity: number; pricePerUnit: number; totalAmount: number; }): Promise<{ product: Inventory; sale: Sale & { productDetails: { _id: string; productName: string; }; customerDetails?: { _id: string; customerName: string; }; }; }> {
        const product=await this._inventoryRepository.decreaseQuantity(data.productId, data.quantity)
        const sale=await this._salesRepository.addSale(data)
        let customer=null
        if(sale.customerId != 'Cash Sale'){
            customer=await this._customerRepository.findById(data.customerId)
        }

        const enrichedSale = {
            ...sale,
            productDetails: {
                _id: product._id,
                productName: product.name
            }
        }

        let finalSale=null
        if(customer){
            finalSale={
                ...enrichedSale,
                customerDetails: {
                    _id: customer._id,
                    customerName: customer.name
                }
            }
        }

        return {product, sale:finalSale ?? enrichedSale}
    }

}