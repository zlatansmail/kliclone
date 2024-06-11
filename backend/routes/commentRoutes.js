import express from "express";

import {
  createComment,
  updateComment,
  deleteComment
} from "../controllers/commentControllers.js";
import { authGuard } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authGuard, createComment);
router
  .route("/:commentId")
  .put(authGuard, updateComment)
  .delete(authGuard, deleteComment);

export default router;
