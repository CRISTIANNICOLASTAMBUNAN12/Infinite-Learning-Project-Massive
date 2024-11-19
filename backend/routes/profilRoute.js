import express from "express";
import * as profilController from "../controllers/profilController.js";
import { verifyToken, checkRole } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get('/', verifyToken, checkRole(['petani', 'admin']), profilController.getProfil);
router.post('/', verifyToken, checkRole(['petani']), upload.single('gambar'), profilController.addProfil); 
router.put('/', verifyToken, checkRole(['petani']), upload.single('gambar'), profilController.upsertProfil); 
router.delete("/", verifyToken, profilController.deleteProfil);

export default router;
