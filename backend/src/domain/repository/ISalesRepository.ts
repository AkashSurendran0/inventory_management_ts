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
    getAllSales(): Promise<Sale[]>
    deleteSale(id: string): Promise<{success:boolean}>
}