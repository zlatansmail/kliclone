import express from "express";

import { createComment } from "../controllers/commentControllers.js";
import { authGuard } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authGuard, createComment);

export default router;
