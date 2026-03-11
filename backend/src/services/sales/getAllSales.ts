import { inject, injectable } from "inversify";
import { IGetAllSales } from "../../domain/services/ISalesService";
import { Sale } from "../../domain/entity/Sale";
import { TYPES } from "../../types";
import { ISalesRepository } from "../../domain/repository/ISalesRepository";
import { IInventoryRepository } from "../../domain/repository/IInventoryRepository";
import { ICustomerRepository } from "../../domain/repository/ICustomerRepository";

type ProductDetails = {
    _id:string,
    productName:string
}

type CustomerDetails = {
    _id:string,
    customerName:string
}

type SaleData = Sale & {
    productDetails:ProductDetails,
    customerDetails?:CustomerDetails
}


@injectable()
export class GetAllSales implements IGetAllSales {

    constructor(
        @inject(TYPES.ISalesRepository) private _salesRepository:ISalesRepository,
        @inject(TYPES.IInventoryRepository) private _inventoryRepository:IInventoryRepository,
        @inject(TYPES.ICustomerRepository) private _customerRepository:ICustomerRepository
    ){}

    async getAllSales(page: number, limit: number): Promise<{sales: SaleData[], totalPages: number}> {
        const result = await this._salesRepository.getAllSales(page, limit)
        let enrichedSales=[]
        for (let sale of result.sales){
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

        return {sales: enrichedSales, totalPages: result.totalPages}
    }

}