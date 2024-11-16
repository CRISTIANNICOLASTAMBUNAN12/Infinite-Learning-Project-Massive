import db from "../config/db.js";

// Menambahkan acara baru
export const addAcara = async (nama, deskripsi, tanggal, lokasi) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query(
        "INSERT INTO Acara (nama, deskripsi, tanggal, lokasi) VALUES (?, ?, ?, ?)",
        [nama, deskripsi, tanggal, lokasi]
      );
    return result.insertId; // Mengembalikan ID acara yang baru dibuat
  } catch (error) {
    throw new Error("Gagal menambahkan acara: " + error.message);
  }
};

// Mendapatkan semua acara
export const getAllAcara = async () => {
  try {
    const [acara] = await db.getDbConnection().query("SELECT * FROM Acara");
    return acara;
  } catch (error) {
    throw new Error("Gagal mengambil semua acara: " + error.message);
  }
};

// Mendapatkan acara berdasarkan ID
export const getAcaraById = async (id) => {
  try {
    const [acara] = await db
      .getDbConnection()
      .query("SELECT * FROM Acara WHERE id = ?", [id]);
    return acara.length > 0 ? acara[0] : null;
  } catch (error) {
    throw new Error("Gagal mengambil acara: " + error.message);
  }
};

// Mengupdate acara berdasarkan ID
export const updateAcara = async (id, nama, deskripsi, tanggal, lokasi) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query(
        "UPDATE Acara SET nama = ?, deskripsi = ?, tanggal = ?, lokasi = ? WHERE id = ?",
        [nama, deskripsi, tanggal, lokasi, id]
      );
    return result.affectedRows > 0; // Mengembalikan true jika acara berhasil diperbarui
  } catch (error) {
    throw new Error("Gagal memperbarui acara: " + error.message);
  }
};

// Menghapus acara berdasarkan ID
export const deleteAcara = async (id) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query("DELETE FROM Acara WHERE id = ?", [id]);
    return result.affectedRows > 0; // Mengembalikan true jika acara berhasil dihapus
  } catch (error) {
    throw new Error("Gagal menghapus acara: " + error.message);
  }
};
