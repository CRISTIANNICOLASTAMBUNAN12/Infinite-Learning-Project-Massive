import express from "express";
import { getProfil, upsertProfil, deleteProfil, addProfil } from "../controllers/profilController.js";
import { verifyToken, checkRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/', verifyToken, checkRole(['petani', 'admin']), getProfil);
router.post('/', verifyToken, checkRole(['petani']), addProfil);
router.put('/', verifyToken, checkRole(['petani']), upsertProfil);
router.delete("/", verifyToken, deleteProfil);

export default router;
