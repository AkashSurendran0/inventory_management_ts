import axios from 'axios'

const backendRoute=import.meta.env.VITE_BACKEND_ROUTE as string

export const api=axios.create({
    baseURL: backendRoute,
    withCredentials: true
})

api.interceptors.request.use(
    (config) => {
        const openRoute=['user/v1/login']

        const isOpenRoute=openRoute.some((route) => 
            config.url?.includes(route)
        )

        if(!isOpenRoute) {
            config.withCredentials=true
        }

        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => {
        return response.data
    },

    async (error) => {
        if(!error.response){
            return Promise.reject({
                message: "Network error. Please check your connection."
            })
        }

        const {status, data}=error.response

        switch (status) {
            case 401:
                console.error("Unauthorized")
                break
            
            case 403:
                console.error("Access denied")
                break

            case 404:
                console.error("Resource not found")
                break

            case 500:
                console.error("Server error")
                break

            default:
                break
        }

        return Promise.reject({
            status,
            message: data?.error?.message || "Something went wrong"
        });
    }
)