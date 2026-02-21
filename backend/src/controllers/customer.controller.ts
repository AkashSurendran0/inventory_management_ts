import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../utils/statusCode.util";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { IAddCustomer, IDeleteCustomer, IEditCustomer, IGetAllCustomer } from "../domain/services/ICustomerService";

@injectable()
export class CustomerController {

    constructor(
        @inject(TYPES.IAddCustomer) private _addCustomer:IAddCustomer,
        @inject(TYPES.IGetAllCustomer) private _getAllCustomer:IGetAllCustomer,
        @inject(TYPES.IEditCustomer) private _editCustomer:IEditCustomer,
        @inject(TYPES.IDeleteCustomer) private _deleteCustomer:IDeleteCustomer
    ){}

    addCustomer = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const data=req.body
            const result=await this._addCustomer.addCustomer(data)
            res.status(STATUS_CODES.OK).json({result})
        } catch (error) {
            next(error)
        }
    }

    getAllCustomers = async (req:Request, res:Response, next:NextFunction) => {
        try {
            let {query}=req.query as {query? : string}
            if(!query || query == 'undefined') query=undefined
            const result=await this._getAllCustomer.getAllCustomers(query)
            res.status(STATUS_CODES.OK).json({result})
        } catch (error) {
            next(error)
        }
    }

    editCustomer = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const data=req.body
            const {id} = req.params as {id:string}
            const result=await this._editCustomer.editCustomer(data, id)
            res.status(STATUS_CODES.OK).json({result})
        } catch (error) {
            next(error)
        }
    }

    deleteCustomer = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const {id}=req.params as {id:string}
            const result=await this._deleteCustomer.deleteCustomer(id)
            res.status(STATUS_CODES.OK).json({result})
        } catch (error) {
            next(error)
        }
    }

}