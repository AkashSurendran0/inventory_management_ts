import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../utils/statusCode.util";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { IAddNewSale, IDeleteSale, IGetAllSales, ISendReport } from "../domain/services/ISalesService";

@injectable()
export class SalesController {

    constructor(
        @inject(TYPES.IAddNewSale) private _addNewSale:IAddNewSale,
        @inject(TYPES.IGetAllSales) private _getAllSales:IGetAllSales,
        @inject(TYPES.IDeleteSale) private _deleteSale:IDeleteSale,
        @inject(TYPES.ISendReport) private _sendReport:ISendReport
    ){}

    addSale = async (req:Request, res:Response, next:NextFunction): Promise<void> => {
        try {
            const data=req.body
            const result=await this._addNewSale.addNewSale(data)
            res.status(STATUS_CODES.OK).json({result})
        } catch (error) {
            next(error)
        }
    }

    getSales = async (req:Request, res:Response, next:NextFunction): Promise<void> => {
        try {
            const result=await this._getAllSales.getAllSales()
            res.status(STATUS_CODES.OK).json({result})
        } catch (error) {
            next(error)
        }
    }

    deleteSale = async (req:Request, res:Response, next:NextFunction): Promise<void> => {
        try {
            const {id}=req.params as {id:string}
            const result=await this._deleteSale.deleteSale(id)
            res.status(STATUS_CODES.OK).json({result})
        } catch (error) {
            next(error)
        }
    }

    sendEmail = async (req:Request, res:Response, next:NextFunction): Promise<void> => {
        try {
            const {blob}=req.body
            const result=await this._sendReport.sendReport(blob)
            res.status(STATUS_CODES.OK).json({result})
        } catch (error) {
            next(error)
        }
    }

}