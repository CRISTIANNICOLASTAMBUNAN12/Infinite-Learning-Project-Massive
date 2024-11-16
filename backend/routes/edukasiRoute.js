import express from "express";
import * as edukasiController from "../controllers/edukasiController.js";

const router = express.Router();

router.post("/", edukasiController.addEdukasi);
router.get("/", edukasiController.getEdukasi);
router.get("/:id", edukasiController.getEdukasiById);
router.put("/:id", edukasiController.updateEdukasi);
router.delete("/:id", edukasiController.deleteEdukasi);

export default router;
