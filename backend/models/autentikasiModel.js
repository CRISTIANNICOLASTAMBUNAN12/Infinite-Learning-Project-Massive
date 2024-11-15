import db from '../config/db.js';

// Menambahkan data autentikasi ke database
export const addAutentikasi = async (pengguna_id, token, kedaluwarsa_pada) => {
  const sql = 'INSERT INTO Autentikasi (pengguna_id, token, kedaluwarsa_pada) VALUES (?, ?, ?)';
  await db.query(sql, [pengguna_id, token, kedaluwarsa_pada]);
};

// Mengambil token berdasarkan pengguna_id
export const getAutentikasiByPenggunaId = async (pengguna_id) => {
  const [rows] = await db.query('SELECT * FROM Autentikasi WHERE pengguna_id = ?', [pengguna_id]);
  return rows[0];
};

// Menghapus autentikasi berdasarkan pengguna_id
export const deleteAutentikasiByPenggunaId = async (pengguna_id) => {
  await db.query('DELETE FROM Autentikasi WHERE pengguna_id = ?', [pengguna_id]);
};
