import express from 'express';
import { addPengguna, getAllPengguna, getPenggunaById, updatePengguna, deletePengguna, loginPengguna } from '../controllers/penggunaController.js';
import { verifyToken, checkRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Define CRUD operations for pengguna (Tanpa autentikasi)
router.post('/', addPengguna);
// Protected routes menggunakan middleware
router.get('/', verifyToken, checkRole(['admin', 'petani']), getAllPengguna);
router.get('/:id', verifyToken, checkRole(['admin', 'petani']), getPenggunaById);
router.put('/:id', verifyToken, checkRole(['admin', 'petani']), updatePengguna);
router.delete('/:id', verifyToken, checkRole(['admin']), deletePengguna);

export default router;
