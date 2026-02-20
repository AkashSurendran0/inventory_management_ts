import { api } from "../lib/api";

type Data = {
    _id?:string,
    name:string,
    description:string,
    quantity:number,
    price:number,
    createdAt?:Date
}

const backendRoute=import.meta.env.VITE_BACKEND_ROUTE

export const getAllProducts = async (query: string | null): Promise<{result:Data[]}> => {
    return await api.get(`${backendRoute}/v1/inventory/products?query=${query}`)
}

export const addItem = async (data: Data): Promise<{result: Data}> => {
    return await api.post(`${backendRoute}/v1/inventory/products`, data)
}

export const editItem = async (data:Data, id:string): Promise<{result: Data}> => {
    return await api.patch(`${backendRoute}/v1/inventory/products/${id}`, data)
}

export const deleteProduct = async (id: string) => {
    return await api.delete(`${backendRoute}/v1/inventory/products/${id}`)
}