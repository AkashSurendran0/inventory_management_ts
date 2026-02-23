import { inject, injectable } from "inversify";
import { IDeleteSale } from "../../domain/services/ISalesService";
import { TYPES } from "../../types";
import { ISalesRepository } from "../../domain/repository/ISalesRepository";

@injectable()
export class DeleteSale implements IDeleteSale {

    constructor(
        @inject(TYPES.ISalesRepository) private _salesRepository:ISalesRepository
    ) {}

    async deleteSale(id: string): Promise<{ success: boolean; }> {
        return await this._salesRepository.deleteSale(id)
    }

}