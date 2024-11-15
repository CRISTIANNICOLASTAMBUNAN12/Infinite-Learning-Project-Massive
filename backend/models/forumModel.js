import db from "../config/db.js";

// Mendapatkan semua forum
export const getAllForum = async () => {
  try {
    const pool = db.getDbConnection();
    const [forums] = await pool.query("SELECT * FROM Forum");
    return forums;
  } catch (error) {
    throw new Error("Error fetching forums: " + error.message);
  }
};

// Mendapatkan forum berdasarkan ID
export const getForumById = async (id) => {
  const sql = "SELECT * FROM Forum WHERE id = ?";
  const connection = await db.getDbConnection();
  const [rows] = await connection.execute(sql, [id]);
  return rows[0];
};

// Fungsi untuk menambahkan forum baru (gunakan nama createForum jika diinginkan)
export const addForum = async (nama, deskripsi) => {
  try {
    // Mendapatkan koneksi dari pool
    const connection = await db.getDbConnection();

    // Menjalankan query menggunakan koneksi
    const [result] = await connection.query(
      "INSERT INTO Forum (nama, deskripsi) VALUES (?, ?)",
      [nama, deskripsi]
    );

    // Tidak perlu melepaskan koneksi di sini
    return { id: result.insertId, nama, deskripsi };
  } catch (error) {
    throw new Error("Error while creating forum: " + error.message);
  }
};

// Mengupdate forum
export const updateForum = async (id, nama, deskripsi) => {
  const sql = "UPDATE Forum SET nama = ?, deskripsi = ? WHERE id = ?";
  const connection = await db.getDbConnection();
  const [result] = await connection.execute(sql, [nama, deskripsi, id]);
  return result;
};

// Menghapus forum
export const deleteForum = async (id) => {
  const sql = "DELETE FROM Forum WHERE id = ?";
  const connection = await db.getDbConnection();
  const [result] = await connection.execute(sql, [id]);
  return result;
};
