import db from "../config/db.js";

// Menambahkan berita baru
export const addBerita = async (judul, konten) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query(
        "INSERT INTO Berita (judul, konten) VALUES (?, ?)",
        [judul, konten]
      );
    return result.insertId; // Mengembalikan ID berita yang baru dibuat
  } catch (error) {
    throw new Error("Gagal menambahkan berita: " + error.message);
  }
};

// Mendapatkan semua berita
export const getAllBerita = async () => {
  try {
    const [berita] = await db.getDbConnection().query("SELECT * FROM Berita");
    return berita;
  } catch (error) {
    throw new Error("Gagal mengambil semua berita: " + error.message);
  }
};

// Mendapatkan berita berdasarkan ID
export const getBeritaById = async (id) => {
  try {
    const [berita] = await db
      .getDbConnection()
      .query("SELECT * FROM Berita WHERE id = ?", [id]);
    return berita.length > 0 ? berita[0] : null;
  } catch (error) {
    throw new Error("Gagal mengambil berita: " + error.message);
  }
};

// Mengupdate berita berdasarkan ID
export const updateBerita = async (id, judul, konten) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query(
        "UPDATE Berita SET judul = ?, konten = ? WHERE id = ?",
        [judul, konten, id]
      );
    return result.affectedRows > 0; // Mengembalikan true jika berita berhasil diperbarui
  } catch (error) {
    throw new Error("Gagal memperbarui berita: " + error.message);
  }
};

// Menghapus berita berdasarkan ID
export const deleteBerita = async (id) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query("DELETE FROM Berita WHERE id = ?", [id]);
    return result.affectedRows > 0; // Mengembalikan true jika berita berhasil dihapus
  } catch (error) {
    throw new Error("Gagal menghapus berita: " + error.message);
  }
};
