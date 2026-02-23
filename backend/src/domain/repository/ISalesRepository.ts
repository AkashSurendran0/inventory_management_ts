import { Sale } from "../entity/Sale";

type Data = {
    date:Date,
    productName:string,
    customerName:string,
    quantity:number,
    pricePerUnit:number,
    totalAmount:number,
    productId?:string
}


export interface ISalesRepository {
    addSale(data: Data): Promise<Sale>
    getAllSales(): Promise<Sale[]>
    deleteSale(id: string): Promise<{success:boolean}>
}