import { inject, injectable } from "inversify";
import { IGetAllSales } from "../../domain/services/ISalesService";
import { Sale } from "../../domain/entity/Sale";
import { TYPES } from "../../types";
import { ISalesRepository } from "../../domain/repository/ISalesRepository";
import { IInventoryRepository } from "../../domain/repository/IInventoryRepository";
import { ICustomerRepository } from "../../domain/repository/ICustomerRepository";

@injectable()
export class GetAllSales implements IGetAllSales {

    constructor(
        @inject(TYPES.ISalesRepository) private _salesRepository:ISalesRepository,
        @inject(TYPES.IInventoryRepository) private _inventoryRepository:IInventoryRepository,
        @inject(TYPES.ICustomerRepository) private _customerRepository:ICustomerRepository
    ){}

    async getAllSales(): Promise<Sale[]> {
        const allSales = await this._salesRepository.getAllSales()
        let enrichedSales=[]
        for (let sale of allSales){
            const product=await this._inventoryRepository.findById(sale.productId)
            let customer=null
            if(sale.customerId != 'Cash Sale'){
                customer=await this._customerRepository.findById(sale.customerId)
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

            if(finalSale) enrichedSales.push(finalSale)
            else enrichedSales.push(enrichedSale)
        }

        return enrichedSales
    }

}