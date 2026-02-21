import { inject, injectable } from "inversify";
import { IDeleteCustomer } from "../../domain/services/ICustomerService";
import { TYPES } from "../../types";
import { ICustomerRepository } from "../../domain/repository/ICustomerRepository";

@injectable()
export class DeleteCustomer implements IDeleteCustomer {

    constructor(
        @inject(TYPES.ICustomerRepository) private _customerRepository:ICustomerRepository
    ){}

    async deleteCustomer(id: string): Promise<{ success: boolean; }> {
        return await this._customerRepository.deleteCustomer(id)
    }

}