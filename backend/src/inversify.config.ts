import { Container } from "inversify";
import { TYPES } from "./types";
import { AuthController } from "./controllers/auth.controller";
import { VerifyLogin } from "./services/auth/verifyLogin";
import { UserRepository } from "./repository/user.repository";
import { TokenHandler } from "./utils/token.util";

const container=new Container()

container.bind(TYPES.IUserRepository).to(UserRepository).inSingletonScope()

container.bind(TYPES.IVerifyLogin).to(VerifyLogin).inSingletonScope()

container.bind(TYPES.AuthController).to(AuthController).inSingletonScope()

container.bind(TYPES.TokenHandler).to(TokenHandler).inSingletonScope()

export default container