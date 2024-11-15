import db from "../config/db.js";

// Fungsi untuk menambahkan profil
export const addProfil = async (
  penggunaId,
  nama,
  lokasi,
  metode_pertanian,
  produk_ditawarkan,
  bio
) => {
  const sql = `
    INSERT INTO Profil (pengguna_id, nama, lokasi, metode_pertanian, produk_ditawarkan, bio)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    const connection = await db.getDbConnection();
    const [result] = await connection.execute(sql, [
      penggunaId,
      nama,
      lokasi,
      metode_pertanian,
      produk_ditawarkan,
      bio,
    ]);
    return result;
  } catch (error) {
    console.error("Error adding profile:", error);
    throw error;
  }
};

export const getProfilByPenggunaId = async (penggunaId) => {
  const sql = `
      SELECT * FROM Profil WHERE pengguna_id = ?
    `;

  try {
    const connection = await db.getDbConnection();
    const [rows] = await connection.execute(sql, [penggunaId]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error fetching profil:", error);
    throw error;
  }
};

// Fungsi upsert untuk Profil (Insert jika belum ada, Update jika sudah ada)
export const upsertProfil = async (
  penggunaId,
  nama,
  lokasi,
  metode_pertanian,
  produk_ditawarkan,
  bio
) => {
  const sql = `
      INSERT INTO Profil (pengguna_id, nama, lokasi, metode_pertanian, produk_ditawarkan, bio)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        nama = VALUES(nama),
        lokasi = VALUES(lokasi),
        metode_pertanian = VALUES(metode_pertanian),
        produk_ditawarkan = VALUES(produk_ditawarkan),
        bio = VALUES(bio)
    `;

  try {
    const connection = await db.getDbConnection();
    const [result] = await connection.execute(sql, [
      penggunaId,
      nama,
      lokasi,
      metode_pertanian,
      produk_ditawarkan,
      bio,
    ]);
    return result;
  } catch (error) {
    console.error("Error upserting profil:", error);
    throw error;
  }
};

export const deleteProfil = async (pengguna_id) => {
  const sql = "DELETE FROM Profil WHERE pengguna_id = ?";

  try {
    const connection = await db.getDbConnection();
    const [result] = await connection.execute(sql, [pengguna_id]);

    if (result.affectedRows === 0) {
      throw new Error("Profil tidak ditemukan");
    }

    return result;
  } catch (error) {
    console.error("Error deleting profil:", error);
    throw error;
  }
};
