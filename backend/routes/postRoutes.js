import express from "express";

import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
  getPostsByCategory
} from "../controllers/postControllers.js";
import { authGuard, adminGuard } from "../middleware/authMiddleware.js";
import { get } from "mongoose";
const router = express.Router();

router.route("/").post(authGuard, adminGuard, createPost).get(getAllPosts);
router
  .route("/:slug")
  .put(authGuard, adminGuard, updatePost)
  .delete(authGuard, adminGuard, deletePost)
  .get(getPost);
router.route("/:categoryTitle").get(getPostsByCategory);
export default router;
