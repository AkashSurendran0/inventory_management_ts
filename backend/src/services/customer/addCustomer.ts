import { inject, injectable } from "inversify";
import { Customer } from "../../domain/entity/Customer";
import { IAddCustomer } from "../../domain/services/ICustomerService";
import { CreateError } from "../../utils/errorHandler.util";
import { STATUS_CODES } from "../../utils/statusCode.util";
import { TYPES } from "../../types";
import { ICustomerRepository } from "../../domain/repository/ICustomerRepository";

@injectable()
export class AddCustomer implements IAddCustomer {

    constructor(
        @inject(TYPES.ICustomerRepository) private _customerRepository:ICustomerRepository
    ){}

    async addCustomer(data: { _id?: string; name: string; address: string; phone: string; }): Promise<Customer> {
        const result=await this._customerRepository.addCustomer(data)
        if(!result.success) throw new CreateError(STATUS_CODES.FORBIDDEN, 'Customer already exists')

        return result.customer!
    }

}