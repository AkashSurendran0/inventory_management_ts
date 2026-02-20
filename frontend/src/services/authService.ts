import { api } from "../lib/api";

type AuthData = {
    email:string,
    password:string
}

const backendRoute=import.meta.env.VITE_BACKEND_ROUTE

export const loginUser = async (data:AuthData) => {
    return await api.post(`${backendRoute}/v1/auth/login`, data)
}

export const verifyUser = async () => {
    return await api.get(`${backendRoute}/v1/auth/me`)
}

export const logoutUser = async () => {
    return await api.post(`${backendRoute}/v1/auth/logout`)
}