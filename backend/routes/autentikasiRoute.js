import express from 'express';
import * as autentikasiController from '../controllers/autentikasiController.js';

const router = express.Router();

// Login route untuk pengguna (petani)
router.post('/login', autentikasiController.loginPengguna);

// Logout route
router.post('/logout', autentikasiController.logoutPengguna);

export default router;
    