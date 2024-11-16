// penggunaModel.js
import db from "../config/db.js";

export const addPengguna = async (data) => {
  const sql = `INSERT INTO Pengguna 
    (nama, email, pengalaman, tentang, alamat, jenis_kelamin, pekerjaan, no_hp, kata_sandi, peran) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const {
    nama,
    email,
    pengalaman,
    tentang,
    alamat,
    jenis_kelamin,
    pekerjaan,
    no_hp,
    kata_sandi,
    peran,
  } = data;

  try {
    const connection = await db.getDbConnection(); // Ambil koneksi dari pool
    const [rows] = await connection.execute(sql, [
      nama,
      email,
      pengalaman || null,
      tentang || null,
      alamat || null,
      jenis_kelamin || null,
      pekerjaan || null,
      no_hp || null,
      kata_sandi,
      peran,
    ]);
    console.log("Rows hasil query: ", rows);
    return rows;
  } catch (error) {
    console.log("Error adding pengguna: ", error);
    throw error;
  }
};

export const getAllPengguna = async () => {
  const sql = "SELECT * FROM Pengguna";

  try {
    const connection = await db.getDbConnection(); // Ambil koneksi dari pool
    const [rows] = await connection.execute(sql); // Menjalankan query
    return rows; // Mengembalikan semua data pengguna
  } catch (error) {
    console.error("Error fetching all pengguna:", error);
    throw error;
  }
};

export const getPenggunaById = async (id) => {
  const sql = "SELECT * FROM Pengguna WHERE id = ?";

  try {
    const connection = await db.getDbConnection(); // Ambil koneksi dari pool
    const [rows] = await connection.execute(sql, [id]); // Menjalankan query dengan ID
    return rows[0]; // Mengembalikan pengguna pertama (karena ID unik)
  } catch (error) {
    console.error("Error fetching pengguna by ID:", error);
    throw error;
  }
};

export const updatePengguna = async (id, data) => {
  const sql = `UPDATE Pengguna SET 
    nama = ?, email = ?, pengalaman = ?, tentang = ?, alamat = ?, jenis_kelamin = ?, pekerjaan = ?, no_hp = ?, kata_sandi = ?, peran = ?
    WHERE id = ?`;

  const {
    nama,
    email,
    pengalaman,
    tentang,
    alamat,
    jenis_kelamin,
    pekerjaan,
    no_hp,
    kata_sandi,
    peran,
  } = data;

  try {
    const connection = await db.getDbConnection();
    await connection.execute(sql, [
      nama,
      email,
      pengalaman || null, 
      tentang || null,
      alamat || null,
      jenis_kelamin || null,
      pekerjaan || null,
      no_hp || null,
      kata_sandi || null, // Kata sandi bisa dibiarkan null jika tidak diubah
      peran || null,
      id,
    ]);
  } catch (error) {
    console.log("Error updating pengguna:", error);
    throw error;
  }
};

// penggunaModel.js
export const deletePengguna = async (id) => {
  const sql = "DELETE FROM Pengguna WHERE id = ?";

  try {
    const connection = await db.getDbConnection();
    const [result] = await connection.execute(sql, [id]);

    if (result.affectedRows === 0) {
      throw new Error("Pengguna tidak ditemukan");
    }
    return result;
  } catch (error) {
    console.error("Error deleting pengguna:", error);
    throw error;
  }
};

export const getPenggunaByEmail = async (email) => {
  try {
    const connection = await db.getDbConnection(); // Ambil koneksi dari pool
    const query = "SELECT * FROM Pengguna WHERE email = ?";
    const [rows] = await connection.execute(query, [email]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.log("Error fetching pengguna by email: ", error);
    throw error;
  }
};
