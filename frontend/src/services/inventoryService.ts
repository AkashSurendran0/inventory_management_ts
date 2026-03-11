import { api } from "../lib/api";

type Data = {
    _id?:string,
    name:string,
    description:string,
    quantity:number,
    price:number,
    isActive?:boolean,
    createdAt?:Date
}

type Response = {
    products: Data[],
    totalPages: number
}

const backendRoute=import.meta.env.VITE_BACKEND_ROUTE

export const getAllProducts = async (query: string | null, page: number, limit: number): Promise<{result:Response}> => {
    return await api.get(`${backendRoute}/v1/inventory/products?query=${query}&page=${page}&limit=${limit}`)
}

export const addItem = async (data: Data): Promise<{result: Data}> => {
    return await api.post(`${backendRoute}/v1/inventory/products`, data)
}

export const editItem = async (data:Data, id:string): Promise<{result: Data}> => {
    return await api.patch(`${backendRoute}/v1/inventory/products/${id}`, data)
}

export const deleteProduct = async (id: string): Promise<{result : Data}> => {
    return await api.delete(`${backendRoute}/v1/inventory/products/${id}`)
}