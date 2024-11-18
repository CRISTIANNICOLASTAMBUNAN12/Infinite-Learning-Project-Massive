import express from 'express';
import 'dotenv/config';
import db from './config/db.js';
import adminRoute from './routes/adminRoute.js';
import penggunaRoute from './routes/penggunaRoute.js';
import autentikasiRoute from './routes/autentikasiRoute.js'; 
import { verifyToken, checkRole } from './middlewares/authMiddleware.js';
import profilRoute from "./routes/profilRoute.js";
import forumRoute from "./routes/forumRoute.js";
import threadRoute from "./routes/threadRoute.js";
import komentarRoute from "./routes/komentarRoute.js";
import grupPenggunaRoute from "./routes/grupPenggunaRoute.js";
import anggotaGrupRoute from "./routes/anggotaGrupRoute.js";
import grupChatRoute from "./routes/grupChatRoute.js";
import chatRoute from "./routes/chatRoute.js";  
import blogRoute from "./routes/blogRoute.js";
import beritaRoute from "./routes/beritaRoute.js";
import acaraRoute from "./routes/acaraRoute.js";
import kategoriRoute from "./routes/kategoriRoute.js";
import produkRoute from "./routes/produkRoute.js";
import pasarRoute from "./routes/pasarRoute.js";
import edukasiRoute from "./routes/edukasiRoute.js";
import aktivitasRoutes from "./routes/aktivitasRoutes.js";
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:5173', // Hanya mengizinkan frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode HTTP yang diizinkan
  credentials: true // Jika menggunakan cookie
}));

app.use(express.json());

try {
  db.connectDB(); 
  console.log('Database connection established, starting server...');

  app.use('/api/auth', autentikasiRoute);

  app.use('/api/pengguna', verifyToken, checkRole(['petani', 'admin']), penggunaRoute);
  app.use('/api/admin', verifyToken, checkRole(['admin']), adminRoute);

  app.use("/api/profil", profilRoute);
  app.use("/api/forum", forumRoute);
  app.use("/api/thread", threadRoute);
  app.use("/api/komentar", komentarRoute);
  app.use("/api/grup-pengguna", grupPenggunaRoute);
  app.use("/api/anggota-grup", anggotaGrupRoute);
  app.use("/api/grup-chat", grupChatRoute);
  app.use("/api/chat", chatRoute);
  app.use("/api/blog", blogRoute);  
  app.use("/api/berita", beritaRoute);
  app.use("/api/acara", acaraRoute);  
  app.use("/api/kategori", kategoriRoute);
  app.use("/api/produk", produkRoute); 
  app.use("/api/pasar", pasarRoute);  
  app.use("/api/edukasi", edukasiRoute);
  app.use("/api/aktivitas", aktivitasRoutes);

  app.get('/', (req, res) => {
    res.send('API is working');
  });

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
} catch (err) {
  console.error('Error connecting to the database:', err);
}
