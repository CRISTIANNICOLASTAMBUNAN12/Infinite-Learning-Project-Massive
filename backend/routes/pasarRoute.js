import express from "express";
import * as pasarController from "../controllers/pasarController.js";
import { verifyToken, checkRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, checkRole(['admin', 'petani']), pasarController.addPasar);
router.get("/", pasarController.getPasar);
router.get("/:id", pasarController.getPasarById);
router.put("/:id", checkRole(['admin', 'petani']), verifyToken, pasarController.updatePasar);
router.delete("/:id", checkRole(['admin', 'petani']), verifyToken, pasarController.deletePasar);

export default router;
