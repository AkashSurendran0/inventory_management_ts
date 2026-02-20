import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

type PayLoad = {
    id:string
}

dotenv.config()

const ACCESS_SECRET=process.env.ACCESS_SECRET
const REFRESH_SECRET=process.env.REFRESH_SECRET

export class TokenHandler {

    generateAccessToken = (payload: PayLoad) => {
        return jwt.sign(payload, ACCESS_SECRET!, {
            expiresIn:'15m'
        })
    }

    generateRefreshToken = (payload: PayLoad) => {
        return jwt.sign(payload, REFRESH_SECRET!, {
            expiresIn:'7d'
        })
    }

    verifyAccessToken = (token: string) => {
        return jwt.verify(token, ACCESS_SECRET!)
    }

    verifyRefreshToken = (token: string) => {
        return jwt.verify(token, REFRESH_SECRET!)
    }

}