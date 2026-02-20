import { inject, injectable } from "inversify";
import { IVerifyLogin } from "../../domain/services/IAuthServices";
import { TYPES } from "../../types";
import { IUserRepository } from "../../domain/repository/IAuthRepository";
import { STATUS_CODES } from "../../utils/statusCode.util";
import { CreateError } from "../../utils/errorHandler.util";
import { TokenHandler } from "../../utils/token.util";

@injectable()
export class VerifyLogin implements IVerifyLogin {

    constructor(
        @inject(TYPES.IUserRepository) private _userRepository:IUserRepository,
        @inject(TYPES.TokenHandler) private _tokenHandler:TokenHandler
    ) {}

    async verifyLogin(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; }> {
        const user=await this._userRepository.findByEmail(email)
        if(!user){
            throw new CreateError(STATUS_CODES.UNAUTHORIZED, 'User doesnt exist')
        }
        const passMatch = user.password === password
        if(!passMatch){
            throw new CreateError(STATUS_CODES.UNAUTHORIZED, 'Password mismatch')
        }
        const payload = {
            id:user._id
        }
        const accessToken=this._tokenHandler.generateAccessToken(payload)
        const refreshToken=this._tokenHandler.generateRefreshToken(payload)

        return {
            accessToken,
            refreshToken
        }
    }

}