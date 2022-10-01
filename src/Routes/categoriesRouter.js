import express from "express";
import * as categoriesControllers from '../Controllers/categories.controller.js';

const router = express.Router();

router.post('/categories', categoriesControllers.createCategories);
router.get('/categories', categoriesControllers.getCategories);

export default router;