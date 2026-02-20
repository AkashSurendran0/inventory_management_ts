import { Router } from "express";
import container from "../../inversify.config";
import { InventoryController } from "../../controllers/inventory.controller";
import { TYPES } from "../../types";

const router=Router()
const inventoryController=container.get<InventoryController>(TYPES.InventoryController)

router.get('/products', inventoryController.getProducts)
// router.post('/products', addProduct)
// router.patch('/products/:id', editProduct)
// router.delete('/products/:id', deleteProduct)

export default router