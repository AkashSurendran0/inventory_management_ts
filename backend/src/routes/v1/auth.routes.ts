import { Router } from "express";
import container from "../../inversify.config";
import { TYPES } from "../../types";
import { AuthController } from "../../controllers/auth.controller";

const router=Router()
const authController=container.get<AuthController>(TYPES.AuthController)

router.post('/login', authController.loginUser)
// router.get('/me', verifyJWT, VerifyMe)
// router.post('/logout', LogoutUser)

export default router