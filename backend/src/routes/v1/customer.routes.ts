import { Router } from "express";
import container from "../../inversify.config";
import { CustomerController } from "../../controllers/customer.controller";
import { TYPES } from "../../types";

const router=Router()
const customerController=container.get<CustomerController>(TYPES.CustomerController)

router.post('/customers', customerController.addCustomer)
router.get('/customers', customerController.getAllCustomers)
router.patch('/customers/:id', customerController.editCustomer)
router.delete('/customers/:id', customerController.deleteCustomer)

export default router