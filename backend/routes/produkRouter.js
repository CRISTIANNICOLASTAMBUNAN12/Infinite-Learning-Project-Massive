import express from "express";
import { verifyToken, checkRole } from "../middlewares/authMiddleware.js";
import * as produkController from "../controllers/produkController.js";

const router = express.Router();

router.post("/", verifyToken, checkRole(["admin"]), produkController.addProduk);
router.get("/", verifyToken, produkController.getAllProduk);
router.put("/:produk_id", verifyToken, checkRole(["admin", "penjual"]), produkController.updateProduk);
router.delete("/:produk_id", verifyToken, checkRole(["admin", "penjual"]), produkController.deleteProduk);

export default router;
