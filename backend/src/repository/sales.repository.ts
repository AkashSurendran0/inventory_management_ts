import { injectable } from "inversify";
import { ISalesRepository } from "../domain/repository/ISalesRepository";
import { Sale } from "../domain/entity/Sale";
import { SalesModel } from "../models/sale.model";

@injectable()
export class SalesRepository implements ISalesRepository {

    async addSale(data: { date: Date; productId: string; customerId: string; quantity: number; pricePerUnit: number; totalAmount: number; }): Promise<Sale> {
        const newSale=await SalesModel.insertOne({
            date:data.date,
            productId:data.productId,
            customerId:data.customerId,
            quantity:data.quantity,
            pricePerUnit:data.pricePerUnit,
            totalAmount:data.totalAmount
        })

        const sale=new Sale ( 
            String(newSale._id),
            newSale.date,
            newSale.productId,
            newSale.customerId,
            newSale.quantity,
            newSale.pricePerUnit,
            newSale.totalAmount
        )

        return sale
    }

    async getAllSales(page: number, limit: number): Promise<{ sales: Sale[]; totalPages: number; }> {
        const allSales=await SalesModel.find().skip((page - 1) * limit).limit(limit)
        const totalPages = Math.ceil(await SalesModel.countDocuments() / limit);

        const sales = allSales.map(sale => 
            new Sale(
                String(sale._id),
                sale.date,
                sale.productId,
                sale.customerId,
                sale.quantity,
                sale.pricePerUnit,
                sale.totalAmount
            )
        )

        return {sales, totalPages}  
    }

    async deleteSale(id: string): Promise<{ success: boolean; }> {
        await SalesModel.findByIdAndDelete(id)
        return {success:true}
    }

}