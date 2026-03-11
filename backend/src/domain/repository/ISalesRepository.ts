import { Sale } from "../entity/Sale";

type Data = {
    date:Date,
    productId:string,
    customerId:string,
    quantity:number,
    pricePerUnit:number,
    totalAmount:number,
}


export interface ISalesRepository {
    addSale(data: Data): Promise<Sale>
    getAllSales(page: number, limit: number): Promise<{sales: Sale[], totalPages: number}>
    deleteSale(id: string): Promise<{success:boolean}>
}