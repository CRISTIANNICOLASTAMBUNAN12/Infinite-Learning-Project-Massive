import db from "../config/db.js";

// Menambahkan kategori baru
export const addKategori = async (nama, jenis) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query("INSERT INTO Kategori (nama, jenis) VALUES (?, ?)", [nama, jenis]);
    return result.insertId; // Mengembalikan ID kategori yang baru dibuat
  } catch (error) {
    throw new Error("Gagal menambahkan kategori: " + error.message);
  }
};

// Mendapatkan semua kategori
export const getAllKategori = async () => {
  try {
    const [kategori] = await db.getDbConnection().query("SELECT * FROM Kategori");
    return kategori;
  } catch (error) {
    throw new Error("Gagal mengambil semua kategori: " + error.message);
  }
};

// Mendapatkan kategori berdasarkan ID
export const getKategoriById = async (id) => {
  try {
    const [kategori] = await db
      .getDbConnection()
      .query("SELECT * FROM Kategori WHERE id = ?", [id]);
    return kategori.length > 0 ? kategori[0] : null;
  } catch (error) {
    throw new Error("Gagal mengambil kategori: " + error.message);
  }
};

// Mengupdate kategori berdasarkan ID
export const updateKategori = async (id, nama, jenis) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query("UPDATE Kategori SET nama = ?, jenis = ? WHERE id = ?", [
        nama,
        jenis,
        id,
      ]);
    return result.affectedRows > 0; // Mengembalikan true jika kategori berhasil diperbarui
  } catch (error) {
    throw new Error("Gagal memperbarui kategori: " + error.message);
  }
};

// Menghapus kategori berdasarkan ID
export const deleteKategori = async (id) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query("DELETE FROM Kategori WHERE id = ?", [id]);
    return result.affectedRows > 0; // Mengembalikan true jika kategori berhasil dihapus
  } catch (error) {
    throw new Error("Gagal menghapus kategori: " + error.message);
  }
};
