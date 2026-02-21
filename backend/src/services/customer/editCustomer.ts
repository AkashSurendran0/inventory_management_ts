import { inject, injectable } from "inversify";
import { Customer } from "../../domain/entity/Customer";
import { IEditCustomer } from "../../domain/services/ICustomerService";
import { CreateError } from "../../utils/errorHandler.util";
import { TYPES } from "../../types";
import { ICustomerRepository } from "../../domain/repository/ICustomerRepository";
import { STATUS_CODES } from "../../utils/statusCode.util";

@injectable()
export class EditCustomer implements IEditCustomer {

    constructor(
        @inject(TYPES.ICustomerRepository) private _customerRepository:ICustomerRepository
    ){}

    async editCustomer(data: { name: string; address: string; phone: string; }, id: string): Promise<Customer> {
        const result=await this._customerRepository.editCustomer(data, id)
        if(!result.success){
            throw new CreateError(STATUS_CODES.FORBIDDEN, 'User already exists')
        }

        return result.customer!
    }

}