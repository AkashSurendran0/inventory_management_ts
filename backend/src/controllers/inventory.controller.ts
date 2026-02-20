import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../utils/statusCode.util";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { IGetAllProducts } from "../domain/services/IInventoryServices";

@injectable()
export class InventoryController {

    constructor(
        @inject(TYPES.IGetAllProducts) private _getAllProducts:IGetAllProducts
    ){}

    getProducts = async (req:Request, res:Response, next:NextFunction) => {
        try {
            let {query}=req.query as { query?: string }
            if(!query || query == 'undefined') query=undefined
            const result=await this._getAllProducts.getAllProducts(query)
            res.status(STATUS_CODES.OK).json({result})
        } catch (error) {
            next(error)
        }
    }

}