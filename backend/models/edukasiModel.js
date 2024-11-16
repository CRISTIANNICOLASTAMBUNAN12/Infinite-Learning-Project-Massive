import db from "../config/db.js"; // Pastikan path sesuai dengan konfigurasi DB Anda

// Fungsi untuk menambahkan edukasi
export const addEdukasi = async (judul, konten, kategori_id) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query(
        "INSERT INTO Edukasi (judul, konten, kategori_id) VALUES (?, ?, ?)",
        [judul, konten, kategori_id]
      );
    return result;
  } catch (error) {
    throw new Error("Gagal menambahkan edukasi: " + error.message);
  }
};

// Fungsi untuk mengambil semua edukasi
export const getEdukasi = async () => {
  try {
    const [rows] = await db.getDbConnection().query("SELECT * FROM Edukasi");
    return rows;
  } catch (error) {
    throw new Error("Gagal mengambil data edukasi: " + error.message);
  }
};

// Fungsi untuk mengambil edukasi berdasarkan ID
export const getEdukasiById = async (id) => {
  try {
    const [rows] = await db
      .getDbConnection()
      .query("SELECT * FROM Edukasi WHERE id = ?", [id]);
    return rows[0]; // Mengembalikan satu data edukasi
  } catch (error) {
    throw new Error("Gagal mengambil data edukasi: " + error.message);
  }
};

// Fungsi untuk memperbarui edukasi berdasarkan ID
export const updateEdukasi = async (id, judul, konten, kategori_id) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query(
        "UPDATE Edukasi SET judul = ?, konten = ?, kategori_id = ? WHERE id = ?",
        [judul, konten, kategori_id, id]
      );
    return result;
  } catch (error) {
    throw new Error("Gagal memperbarui edukasi: " + error.message);
  }
};

// Fungsi untuk menghapus edukasi berdasarkan ID
export const deleteEdukasi = async (id) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query("DELETE FROM Edukasi WHERE id = ?", [id]);
    return result.affectedRows > 0; // Mengembalikan true jika ada data yang dihapus
  } catch (error) {
    throw new Error("Gagal menghapus edukasi: " + error.message);
  }
};