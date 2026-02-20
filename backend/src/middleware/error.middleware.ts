import { NextFunction, Request, Response } from "express"

export const errorHandler = (err: any, req:Request, res:Response, next:NextFunction) => {
    const statusCode=err.statusCode || 500

    res.status(statusCode).json({
        success:false,
        error:{
            code:err.statusCode || 'Internal server error',
            message:err.message || 'Something went wrong'
        }
    })
}