// routes/chatRouter.js
import express from "express";
import * as chatController from "../controllers/chatController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";  // Pastikan middleware verifikasi token ada

const router = express.Router();

router.post("/kirim", verifyToken, chatController.sendPesan);
router.get("/:penerima_id", verifyToken, chatController.getPesan);
router.delete("/:id", verifyToken, chatController.deletePesan);

export default router;
