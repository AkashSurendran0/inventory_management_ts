import { api } from "../lib/api";

type Data = {
    _id?:string,
    name:string,
    address:string,
    phone:string
}

const backendRoute=import.meta.env.VITE_BACKEND_ROUTE

export const addNewCustomer = async (data: Data): Promise<{result: Data}> => {
    return await api.post(`${backendRoute}/v1/customer/customers`, data)
}

export const getAllCustomers = async (query: string | null): Promise<{result: Data[]}> => {
    return await api.get(`${backendRoute}/v1/customer/customers?query=${query}`)
}

export const editCustomer = async (data: Data, id: string): Promise<{result: Data}> => {
    return await api.patch(`${backendRoute}/v1/customer/customers/${id}`, data)
}

export const deleteUser = async (id:string): Promise<{result : {success:boolean}}> => {
    return await api.delete(`${backendRoute}/v1/customer/customers/${id}`)
}