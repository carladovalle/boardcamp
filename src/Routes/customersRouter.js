import express from "express";
import * as customersControllers from '../Controllers/customers.controller.js';

const router = express.Router();

router.post('/customers', customersControllers.createCustomers);
router.put('/customers/:id', customersControllers.updateCustomers);
router.get('/customers', customersControllers.getCustomers);
router.get('/customers/:id', customersControllers.viewCustomers);

export default router;