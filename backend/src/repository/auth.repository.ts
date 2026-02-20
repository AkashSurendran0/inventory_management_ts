import { injectable } from "inversify";
import { User } from "../domain/entity/User";
import { IAuthRepository } from "../domain/repository/IAuthRepository";
import { UserModel } from "../models/user.model";

@injectable()
export class AuthRepository implements IAuthRepository {

    async findByEmail(email: string): Promise<User | null> {
        const user=await UserModel.findOne({email:email})
        if(!user) return null

        return new User (
            String(user._id),
            user.email,
            user.password,
            user.createdAt
        )
    }

}