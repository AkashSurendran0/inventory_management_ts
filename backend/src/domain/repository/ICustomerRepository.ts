import { Customer } from "../entity/Customer";

type Data = {
    name:string,
    address:string,
    phone:string
}

export interface ICustomerRepository {
    addCustomer(data: Data): Promise<{success:boolean, customer?:Customer}>
    getAllCustomers(): Promise<Customer[]>
    getAllCustomersByQuery(query:string): Promise<Customer[]>
    editCustomer(data:Data, id:string): Promise<{success:boolean, customer?:Customer}>
    deleteCustomer(id:string): Promise<Customer>
    findById(id:string): Promise<Customer>
}