import { injectable } from "inversify";
import { Customer } from "../domain/entity/Customer";
import { ICustomerRepository } from "../domain/repository/ICustomerRepository";
import { CustomerModel } from "../models/customer.model";

@injectable()
export class CustomerRepository implements ICustomerRepository {

    async addCustomer(data: { name: string; address: string; phone: string; }): Promise<{success:boolean, customer?:Customer}> {
        const existingCustomer = await CustomerModel.findOne({normalizedName:data.name.toLowerCase()})
        if(existingCustomer) return {success:false}

        const newCustomer = await CustomerModel.insertOne(
            {
                name:data.name,
                normalizedName:data.name.toLowerCase(),
                address:data.address,
                phone:data.phone
            }
        )

        const customer=new Customer (
            String(newCustomer._id),
            newCustomer.name,
            newCustomer.normalizedName,
            newCustomer.address,
            newCustomer.phone
        )
        return {success:true, customer}
    }

    async getAllCustomers(): Promise<Customer[]> {
        const customers=await CustomerModel.find()
        return customers.map(customer => 
            new Customer (
                String(customer._id),
                customer.name,
                customer.normalizedName,
                customer.address,
                customer.phone
            )
        )
    }

    async getAllCustomersByQuery(query: string): Promise<Customer[]> {
        const customers=await CustomerModel.find({
            normalizedName:{$regex:query, $options:'i'}
        })
        return customers.map(customer => 
            new Customer (
                String(customer._id),
                customer.name,
                customer.normalizedName,
                customer.address,
                customer.phone
            )
        )
    }

    async editCustomer(data: { name: string; address: string; phone: string; }, id: string): Promise<{success:boolean, customer?:Customer}> {
        const existingCustomer = await CustomerModel.findOne({
            normalizedName:data.name.toLowerCase(),
            _id:{$ne:id}
        })
        if(existingCustomer) return {success:false}

        const newCustomer=await CustomerModel.findByIdAndUpdate(
            id,
            {$set:{
                name:data.name,
                normalizedName:data.name.toLowerCase(),
                address:data.address,
                phone:data.phone
            }},
            {new:true}
        )

        const customer=new Customer (
            String(newCustomer!._id),
            newCustomer!.name,
            newCustomer!.normalizedName,
            newCustomer!.address,
            newCustomer!.phone
        )
        return {success:true, customer}
    }

    async deleteCustomer(id: string): Promise<{ success: boolean; }> {
        await CustomerModel.findByIdAndDelete(id)
        return {success:true}
    }

}