import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../utils/statusCode.util";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { IAddProduct, IEditProduct, IGetAllProducts } from "../domain/services/IInventoryServices";

@injectable()
export class InventoryController {

    constructor(
        @inject(TYPES.IGetAllProducts) private _getAllProducts:IGetAllProducts,
        @inject(TYPES.IAddProduct) private _addProduct:IAddProduct,
        @inject(TYPES.IEditProduct) private _editProduct:IEditProduct
    ){}

    getProducts = async (req:Request, res:Response, next:NextFunction): Promise<void> => {
        try {
            let {query}=req.query as { query?: string }
            if(!query || query == 'undefined') query=undefined
            const result=await this._getAllProducts.getAllProducts(query)
            res.status(STATUS_CODES.OK).json({result})
        } catch (error) {
            next(error)
        }
    }

    addProducts = async (req:Request, res:Response, next:NextFunction): Promise<void> => {
        try {
            const data=req.body
            const result=await this._addProduct.addProduct(data)
            res.status(STATUS_CODES.OK).json({result})
        } catch (error) {
            next(error)
        }
    }

    editProduct = async (req:Request, res:Response, next:NextFunction): Promise<void> => {
        try {
            const data=req.body
            const {id}=req.params as {id: string}
            const result=await this._editProduct.editProduct(data, id)
            res.status(STATUS_CODES.OK).json({result})
        } catch (error) {
            next(error)
        }
    }

}