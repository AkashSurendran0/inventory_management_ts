import { api } from "../lib/api";

const backendRoute=import.meta.env.VITE_BACKEND_ROUTE

type Data = {
    _id?:string,
    date:Date,
    productName:string,
    customerName:string,
    quantity:number,
    pricePerUnit:number,
    totalAmount:number
}

type Product = {
    _id:string,
    name:string,
    description:string,
    quantity:number,
    price:number,
    createdAt?:Date
}


export const addNewSale = async (data: Data): Promise<{result: {product:Product, sale:Data}}> => {
    return await api.post(`${backendRoute}/v1/sale/sales`, data)
}

export const getSales = async (): Promise<{result: Data[]}> => {
    return await api.get(`${backendRoute}/v1/sale/sales`)
}

export const deleteSale = async (id: string): Promise<{success:boolean}> => {
    return await api.delete(`${backendRoute}/v1/sale/sales/${id}`)
}

export const sendEmail = async (blob: string | ArrayBuffer | null): Promise<{success:boolean}> => {
    return await api.post(`${backendRoute}/v1/sale/email`, {blob: blob})
}