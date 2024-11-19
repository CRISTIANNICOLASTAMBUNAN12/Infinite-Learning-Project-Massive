import express from "express";
import { verifyToken, checkRole } from "../middlewares/authMiddleware.js";
import * as produkController from "../controllers/produkController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, checkRole(["admin"]), upload.single("gambar"), produkController.addProduk);
router.get("/", verifyToken, produkController.getAllProduk);
router.put("/:produk_id", verifyToken, checkRole(["admin", "penjual"]), upload.single("gambar"), produkController.updateProduk);
router.delete("/:produk_id", verifyToken, checkRole(["admin", "penjual"]), produkController.deleteProduk);
router.get('/jumlah/jumlah-terbaru', produkController.getJumlahProduk);

export default router;
