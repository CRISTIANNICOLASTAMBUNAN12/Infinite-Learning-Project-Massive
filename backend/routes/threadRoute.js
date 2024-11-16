import express from "express";
import * as threadController from "../controllers/threadController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/forum/:forumId", verifyToken, threadController.getThreadsByForum);
router.post("/forum/:forumId", verifyToken, threadController.createThread);
router.delete("/:id", verifyToken, threadController.removeThread);
router.put("/:id", verifyToken, threadController.updateThread);

export default router;
