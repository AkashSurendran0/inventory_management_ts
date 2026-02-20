import { User } from "../entity/User";

export interface IAuthRepository {
    findByEmail(email:string):Promise<User | null>
}