import db from '../config/db.js';  // Impor objek default dari db.js

// Fungsi untuk mendapatkan semua pengguna
const getAllUsers = async () => {
  const query = 'SELECT * FROM users';
  
  try {
    const connection = await db.getDbConnection();  // Pastikan koneksi sudah siap
    const [rows] = await connection.query(query);  // Menggunakan query dengan Promise
    return rows;  // Mengembalikan hasil query
  } catch (error) {
    console.error('Error di getAllUsers:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan pengguna berdasarkan ID
const getUserById = async (id) => {
  const query = 'SELECT * FROM users WHERE id = ?';

  try {
    const connection = await db.getDbConnection();  // Pastikan koneksi sudah siap
    const [rows] = await connection.query(query, [id]);  // Gunakan Promise dengan query
    return rows[0];  // Mengembalikan hasil pertama
  } catch (error) {
    console.error('Error di getUserById:', error);
    throw error;  // Lempar ulang error untuk ditangani oleh controller
  }
};

// Fungsi untuk menambahkan pengguna baru
const addUser = async (user) => {
  const query = 'INSERT INTO users SET ?';

  try {
    const connection = await db.getDbConnection();  // Pastikan koneksi sudah siap
    const [result] = await connection.query(query, [user]);  // Menggunakan Promise dengan query
    return result;  // Mengembalikan hasil operasi
  } catch (error) {
    console.error('Error di addUser:', error);
    throw error;
  }
};

// Fungsi untuk memperbarui data pengguna
const updateUser = async (id, user) => {
  const query = 'UPDATE users SET ? WHERE id = ?';

  try {
    const connection = await db.getDbConnection();  // Pastikan koneksi sudah siap
    const [result] = await connection.query(query, [user, id]);  // Menggunakan Promise dengan query
    return result;  // Mengembalikan hasil operasi
  } catch (error) {
    console.error('Error di updateUser:', error);
    throw error;
  }
};

// Fungsi untuk menghapus pengguna
const deleteUser = async (id) => {
  const query = 'DELETE FROM users WHERE id = ?';

  try {
    const connection = await db.getDbConnection();  // Pastikan koneksi sudah siap
    const [result] = await connection.query(query, [id]);  // Menggunakan Promise dengan query
    return result;  // Mengembalikan hasil operasi
  } catch (error) {
    console.error('Error di deleteUser:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan pengguna berdasarkan email
const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = ?';

  try {
    const connection = await db.getDbConnection();  // Tunggu sampai koneksi siap
    const [rows] = await connection.query(query, [email]);  // Jalankan query setelah koneksi siap
    return rows[0];  // Mengembalikan user pertama jika ditemukan
  } catch (error) {
    console.error('Error di getUserByEmail:', error);
    throw error;  // Lempar ulang error untuk ditangani oleh controller
  }
};

export default { getAllUsers, getUserById, addUser, updateUser, deleteUser, getUserByEmail };
