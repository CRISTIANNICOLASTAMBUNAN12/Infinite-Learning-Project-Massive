import express from "express";
import * as beritaController from "../controllers/beritaController.js";

const router = express.Router();

router.post("/", beritaController.addBerita);
router.get("/", beritaController.getAllBerita);
router.get("/:id", beritaController.getBeritaById);
router.put("/:id", beritaController.updateBerita);
router.delete("/:id", beritaController.deleteBerita);

export default router;
