import { NextFunction, Response, Request } from "express";
import { inject, injectable } from "inversify";
import { STATUS_CODES } from "../utils/statusCode.util";
import { TYPES } from "../types";
import { IVerifyLogin } from "../domain/services/IAuthServices";

@injectable()
export class AuthController {

    constructor(
        @inject(TYPES.IVerifyLogin) private _verifyLogin:IVerifyLogin
    ){}

    loginUser = async (req:Request, res:Response, next:NextFunction): Promise<void> => {
        try {
            const {email, password}=req.body
            const result=await this._verifyLogin.verifyLogin(email, password)
            res.cookie("token", result.accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            })
            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            })
            res.status(STATUS_CODES.OK).json({success:true})
        } catch (error) {
            next(error)
        }
    }

}