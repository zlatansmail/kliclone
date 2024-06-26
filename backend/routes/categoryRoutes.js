import express from "express";

import {
  createCategory,
  updateCategory,
  getAllCategories,
  deleteCategory,
  getCategoryById
} from "../controllers/categoryControllers.js";
import { authGuard, adminGuard } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authGuard, adminGuard, createCategory)
  .get(getAllCategories);
router
  .route("/:categoryId")
  .get(getCategoryById)
  .put(authGuard, adminGuard, updateCategory)
  .delete(authGuard, adminGuard, deleteCategory);

export default router;
