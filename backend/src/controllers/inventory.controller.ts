import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../utils/statusCode.util";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { IAddProduct, IDeleteProduct, IEditProduct, IGetAllProducts } from "../domain/services/IInventoryServices";

@injectable()
export class InventoryController {

    constructor(
        @inject(TYPES.IGetAllProducts) private _getAllProducts:IGetAllProducts,
        @inject(TYPES.IAddProduct) private _addProduct:IAddProduct,
        @inject(TYPES.IEditProduct) private _editProduct:IEditProduct,
        @inject(TYPES.IDeleteProduct) private _deleteProduct:IDeleteProduct
    ){}

    getProducts = async (req:Request, res:Response, next:NextFunction): Promise<void> => {
        try {
            let {query, page, limit}=req.query as { query?: string, page?: string, limit?: string }
            const pageNumber = page ? parseInt(page) : 1;
            const limitNumber = limit ? parseInt(limit) : 2;
            if(!query || query == 'undefined') query=undefined
            const result=await this._getAllProducts.getAllProducts(query, pageNumber, limitNumber)
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

    deleteProduct = async (req:Request, res:Response, next:NextFunction): Promise<void> => {
        try {
            const {id}=req.params as {id: string}
            const result=await this._deleteProduct.deleteProduct(id)
            res.status(STATUS_CODES.OK).json({result})
        } catch (error) {
            next(error)
        }
    }

}