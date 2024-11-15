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
      pengalaman,
      tentang,
      alamat,
      jenis_kelamin,
      pekerjaan,
      no_hp,
      kata_sandi,
      peran,
    ]);
    console.log("Rows hasil query: ", rows);
  } catch (error) {
    console.log("Error adding pengguna: ", error);
    throw error;
  }
};

export const getAllPengguna = async () => {
  try {
    const connection = await db.getDbConnection(); // Ambil koneksi dari pool
    const [rows] = await connection.execute("SELECT * FROM Pengguna");
    console.log("Fetched Pengguna: ", rows); // Log data pengguna
    return rows;
  } catch (error) {
    console.log("Error fetching pengguna: ", error);
    throw error;
  }
};

export const getPenggunaById = async (id) => {
  try {
    const connection = await db.getDbConnection(); // Ambil koneksi dari pool
    const [rows] = await connection.execute(
      "SELECT * FROM Pengguna WHERE id = ?",
      [id]
    );
    return rows[0];
  } catch (error) {
    console.log("Error fetching pengguna by ID: ", error);
    throw error;
  }
};

// penggunaModel.js
export const updatePengguna = async (id, data) => {
  const sql = `UPDATE Pengguna SET 
    nama=?, email=?, pengalaman=?, tentang=?, alamat=?, jenis_kelamin=?, pekerjaan=?, no_hp=?, kata_sandi=?, peran=? 
    WHERE id=?`;

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
      pengalaman,
      tentang,
      alamat,
      jenis_kelamin || null, // Mengirim null jika tidak ada nilai
      pekerjaan || null,
      no_hp || null,
      kata_sandi,
      peran || null,
      id,
    ]);
  } catch (error) {
    console.log("Error updating pengguna: ", error);
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
