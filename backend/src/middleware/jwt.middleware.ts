import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { TokenHandler } from '../utils/token.util'
import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'

dotenv.config()

@injectable()
export class JwtHandler {

    constructor(
        @inject(TYPES.TokenHandler) private _tokenHandler:TokenHandler
    ){}

    async verifyJwt (req:Request, res:Response, next:NextFunction) {
        const accessToken=req.cookies.token
        const refreshToken=req.cookies.refreshToken

        if (!accessToken && !refreshToken) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        try {

            const decoded=jwt.verify(accessToken, process.env.ACCESS_SECRET!)
            req.user=decoded
            return next()

        } catch (error) {

            if(!accessToken){
                return res.status(401).json({ message: "Unauthorized" })
            }

            if (!refreshToken) {
                return res.status(401).json({ message: "Unauthorized" })
            }
            
            try {
                const decodedRefresh=jwt.verify(refreshToken, process.env.REFRESH_SECRET!)
                let payload
                if (typeof decodedRefresh !== "string") {
                    payload = {
                        id: decodedRefresh.id
                    }
                }
                const newAccessToken=this._tokenHandler.generateAccessToken(payload!)
                res.cookie("token", newAccessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict"
                })
                req.user = decodedRefresh
                next()
            } catch (error) {
                return res.status(401).json({ message: "Invalid refresh token" })
            }
        }
    }

}