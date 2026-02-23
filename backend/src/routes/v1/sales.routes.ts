import { Router } from "express";
import container from "../../inversify.config";
import { SalesController } from "../../controllers/sales.controller";
import { TYPES } from "../../types";

const router=Router()
const salesController=container.get<SalesController>(TYPES.SalesController)

router.post('/sales', salesController.addSale)
router.get('/sales', salesController.getSales)
router.delete('/sales/:id', salesController.deleteSale)
router.post('/email', salesController.sendEmail)

export default router