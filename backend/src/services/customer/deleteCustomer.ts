import { inject, injectable } from "inversify";
import { IDeleteCustomer } from "../../domain/services/ICustomerService";
import { TYPES } from "../../types";
import { ICustomerRepository } from "../../domain/repository/ICustomerRepository";
import { Customer } from "../../domain/entity/Customer";

@injectable()
export class DeleteCustomer implements IDeleteCustomer {

    constructor(
        @inject(TYPES.ICustomerRepository) private _customerRepository:ICustomerRepository
    ){}

    async deleteCustomer(id: string): Promise<Customer> {
        return await this._customerRepository.deleteCustomer(id)
    }

}