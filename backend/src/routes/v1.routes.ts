import { Router } from "express";
import AuthRouter from './v1/auth.routes'
import container from "../inversify.config";
import { JwtHandler } from "../middleware/jwt.middleware";
import { TYPES } from "../types";
import InventoryRouter from './v1/inventory.routes'
import CustomerRouter from './v1/customer.routes'
import SalesRouter from './v1/sales.routes'

const router=Router()

const jwtHandler=container.get<JwtHandler>(TYPES.JwtHandler)

router.use('/auth', AuthRouter) 
router.use('/inventory', jwtHandler.verifyJwt, InventoryRouter)
router.use('/customer', jwtHandler.verifyJwt, CustomerRouter)
router.use('/sale', jwtHandler.verifyJwt, SalesRouter)

export default router