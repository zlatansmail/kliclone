import express from "express";

import {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getAllPosts
} from "../controllers/postControllers.js";
import { authGuard, adminGuard } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(authGuard, adminGuard, createPost).get(getAllPosts);
router
  .route("/:slug")
  .put(authGuard, adminGuard, updatePost)
  .delete(authGuard, adminGuard, deletePost)
  .get(getPosts);

export default router;
