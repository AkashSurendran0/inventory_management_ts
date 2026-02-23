import { api } from "../lib/api";

const backendRoute=import.meta.env.VITE_BACKEND_ROUTE

type Sale = {
    _id?:string,
    date:Date,
    productId:string,
    customerId:string,
    quantity:number,
    pricePerUnit:number,
    totalAmount:number
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

type Product = {
    _id:string,
    name:string,
    description:string,
    quantity:number,
    price:number,
    createdAt?:Date
}


export const addNewSale = async (data: Sale): Promise<{result: {product:Product, sale:SaleData}}> => {
    return await api.post(`${backendRoute}/v1/sale/sales`, data)
}

export const getSales = async (): Promise<{result: SaleData[]}> => {
    return await api.get(`${backendRoute}/v1/sale/sales`)
}

export const deleteSale = async (id: string): Promise<{success:boolean}> => {
    return await api.delete(`${backendRoute}/v1/sale/sales/${id}`)
}

export const sendEmail = async (blob: string | ArrayBuffer | null): Promise<{success:boolean}> => {
    return await api.post(`${backendRoute}/v1/sale/email`, {blob: blob})
}