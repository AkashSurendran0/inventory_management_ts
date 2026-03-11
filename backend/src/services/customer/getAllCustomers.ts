import { inject, injectable } from "inversify";
import { Customer } from "../../domain/entity/Customer";
import { IGetAllCustomer } from "../../domain/services/ICustomerService";
import { TYPES } from "../../types";
import { ICustomerRepository } from "../../domain/repository/ICustomerRepository";

@injectable()
export class GetAllCustomers implements IGetAllCustomer {

    constructor(
        @inject(TYPES.ICustomerRepository) private _customerRepository:ICustomerRepository
    ){}

    async getAllCustomers(query: string, page: number, limit: number): Promise<{customers: Customer[], totalPages: number}> {
        if(query){
            return await this._customerRepository.getAllCustomersByQuery(query, page, limit)
        }else{
            return await this._customerRepository.getAllCustomers(page, limit)
        }
    }

}