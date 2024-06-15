import express from "express";

import {
  createComment,
  updateComment,
  deleteComment,
  getAllComments
} from "../controllers/commentControllers.js";
import { authGuard } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authGuard, createComment)
  .get(authGuard, getAllComments);
router
  .route("/:commentId")
  .put(authGuard, updateComment)
  .delete(authGuard, deleteComment);

export default router;
