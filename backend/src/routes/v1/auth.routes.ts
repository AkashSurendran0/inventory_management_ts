import { Router } from "express";
import container from "../../inversify.config";
import { TYPES } from "../../types";
import { AuthController } from "../../controllers/auth.controller";
import { JwtHandler } from "../../middleware/jwt.middleware";

const router=Router()
const authController=container.get<AuthController>(TYPES.AuthController)
const jwtHandler=container.get<JwtHandler>(TYPES.JwtHandler)

router.post('/login', authController.loginUser)
router.get('/me', jwtHandler.verifyJwt, authController.verifyMe)
router.post('/logout', authController.logoutUser)

export default router 