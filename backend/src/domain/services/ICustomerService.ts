import { Customer } from "../entity/Customer";

type Data = {
    name:string,
    address:string,
    phone:string
}

export interface IAddCustomer {
    addCustomer(data: Data): Promise<Customer>
}

export interface IGetAllCustomer {
    getAllCustomers(query:string | undefined): Promise<Customer[]>
}

export interface IEditCustomer {
    editCustomer(data:Data, id:string): Promise<Customer>
}

export interface IDeleteCustomer {
    deleteCustomer(id:string): Promise<{success:boolean}>
}