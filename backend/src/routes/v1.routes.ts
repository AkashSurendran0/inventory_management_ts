import { Router } from "express";
import AuthRouter from './v1/auth.routes'

const router=Router()

router.use('/auth', AuthRouter)
// router.use('/inventory', verifyJWT, InventoryRouter)
// router.use('/customer', verifyJWT, CustomerRouter)
// router.use('/sale', verifyJWT, SalesRouter)

export default router