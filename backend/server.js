import express from 'express';
import 'dotenv/config';
import db from './config/db.js';  // Perbaiki impor
import adminRouter from './routes/adminRoute.js';  // Correct path
import userRoutes from './routes/userRoute.js';
import userController from './controllers/userController.js';  // Correct import
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

// Pastikan koneksi database dilakukan di awal
db.connectDB()  // Tunggu sampai koneksi selesai
  .then(() => {
    console.log('Database connection established, starting server...');

    app.use(express.json());
    app.use('/api/admin', adminRouter);
    app.use('/api/users', userRoutes);

    app.get('/', (req, res) => {
      res.send('API is working');
    });

    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
