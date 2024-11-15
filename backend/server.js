import express from 'express';
import 'dotenv/config';
import db from './config/db.js';
import adminRouter from './routes/adminRoute.js';
import penggunaRouter from './routes/penggunaRoute.js';
import autentikasiRouter from './routes/autentikasiRoute.js'; // Import route autentikasi
import { verifyToken, checkRole } from './middlewares/authMiddleware.js';
import profilRoutes from "./routes/profilRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";
import threadRoutes from "./routes/threadRoutes.js";
import komentarRoutes from "./routes/komentarRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// Middleware untuk parsing JSON
app.use(express.json());

// Koneksi ke database (tidak perlu pakai .then() karena pool sudah diinisialisasi)
try {
  db.connectDB(); // Inisialisasi pool
  console.log('Database connection established, starting server...');

  // Tambahkan route autentikasi tanpa middleware
  app.use('/api/auth', autentikasiRouter);

  // Gunakan middleware hanya pada route pengguna dan admin
  app.use('/api/pengguna', verifyToken, checkRole(['petani', 'admin']), penggunaRouter);
  app.use('/api/admin', verifyToken, checkRole(['admin']), adminRouter);

  app.use("/api/profil", profilRoutes);
  app.use("/api/forum", forumRoutes);
  app.use("/api/thread", threadRoutes);
  app.use("/api/komentar", komentarRoutes);

  // Test route
  app.get('/', (req, res) => {
    res.send('API is working');
  });

  // Start server
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
} catch (err) {
  console.error('Error connecting to the database:', err);
}
