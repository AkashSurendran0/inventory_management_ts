import { Inventory } from "../entity/Inventory"
import { Sale } from "../entity/Sale"

type Data = {
    date:Date,
    productId:string,
    customerId:string,
    quantity:number,
    pricePerUnit:number,
    totalAmount:number,
}

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

export interface IAddNewSale {
    addNewSale(data: Data): Promise<{product:Inventory, sale:SaleData}>
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