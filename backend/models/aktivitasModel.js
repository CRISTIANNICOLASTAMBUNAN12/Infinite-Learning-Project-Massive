import db from '../config/db.js'; 

export const getAktivitasTerbaruFromDB = async () => {
  try {
    const connection = await db.getDbConnection();
    const [rows] = await connection.query('SELECT * FROM aktivitas ORDER BY created_at DESC LIMIT 5'); // Mengambil 5 aktivitas terbaru
    return rows;
  } catch (error) {
    console.error('Error fetching recent activities from DB:', error);
    throw error;
  }
};