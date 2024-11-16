import express from 'express';
import * as penggunaController from '../controllers/penggunaController.js';
import { verifyToken, checkRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', penggunaController.addPengguna);
router.get('/', verifyToken, checkRole(['admin', 'petani']), penggunaController.getAllPengguna);
router.get('/:id', verifyToken, checkRole(['admin', 'petani']), penggunaController.getPenggunaById);
router.put('/:id', verifyToken, checkRole(['admin', 'petani']), penggunaController.updatePengguna);
router.delete('/:id', verifyToken, checkRole(['admin']), penggunaController.deletePengguna);

export default router;
