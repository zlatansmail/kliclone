import express from 'express';
import { addCategory, updateCategory, getCategories } from '../controllers/categoryControllers.js';

const router = express.Router();

router.post('/', addCategory);
router.put('/:id', updateCategory);
router.get('/', getCategories);

export default router;