import { inject, injectable } from "inversify";
import { IGetAllSales } from "../../domain/services/ISalesService";
import { Sale } from "../../domain/entity/Sale";
import { TYPES } from "../../types";
import { ISalesRepository } from "../../domain/repository/ISalesRepository";

@injectable()
export class GetAllSales implements IGetAllSales {

    constructor(
        @inject(TYPES.ISalesRepository) private _salesRepository:ISalesRepository
    ){}

    async getAllSales(): Promise<Sale[]> {
        return await this._salesRepository.getAllSales()
    }

}