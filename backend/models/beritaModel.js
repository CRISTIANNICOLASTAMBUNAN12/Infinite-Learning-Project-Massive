import db from "../config/db.js";

export const addBerita = async (judul, konten) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query("INSERT INTO Berita (judul, konten) VALUES (?, ?)", [
        judul,
        konten,
      ]);
    return result.insertId;
  } catch (error) {
    throw new Error("Gagal menambahkan berita: " + error.message);
  }
};

export const getAllBerita = async () => {
  try {
    const [berita] = await db.getDbConnection().query("SELECT * FROM Berita");
    return berita;
  } catch (error) {
    throw new Error("Gagal mengambil semua berita: " + error.message);
  }
};

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

export const updateBerita = async (id, judul, konten) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query("UPDATE Berita SET judul = ?, konten = ? WHERE id = ?", [
        judul,
        konten,
        id,
      ]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Gagal memperbarui berita: " + error.message);
  }
};

export const deleteBerita = async (id) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query("DELETE FROM Berita WHERE id = ?", [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Gagal menghapus berita: " + error.message);
  }
};
