import express from "express";
import * as rentalsControllers from '../Controllers/rentals.controller.js';

const router = express.Router();

router.post('/rentals', rentalsControllers.createRentals);
router.get('/rentals', rentalsControllers.getRentals);

export default router;