import { Inventory } from "../entity/Inventory"
import { Sale } from "../entity/Sale"

type Data = {
    date:Date,
    productName:string,
    customerName:string,
    quantity:number,
    pricePerUnit:number,
    totalAmount:number,
    productId?:string
}

export interface IAddNewSale {
    addNewSale(data: Data): Promise<{product:Inventory, sale:Sale}>
}

export interface IGetAllSales {
    getAllSales(): Promise<Sale[]>
}

export interface IDeleteSale {
    deleteSale(id: string): Promise<{success:boolean}>
}

export interface ISendReport {
    sendReport(blob: string): Promise<{success:boolean}>
}