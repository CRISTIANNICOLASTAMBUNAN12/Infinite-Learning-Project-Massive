import db from "../config/db.js";

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

export const getEdukasi = async () => {
  try {
    const [rows] = await db.getDbConnection().query("SELECT * FROM Edukasi");
    return rows;
  } catch (error) {
    throw new Error("Gagal mengambil data edukasi: " + error.message);
  }
};

export const getEdukasiById = async (id) => {
  try {
    const [rows] = await db
      .getDbConnection()
      .query("SELECT * FROM Edukasi WHERE id = ?", [id]);
    return rows[0];
  } catch (error) {
    throw new Error("Gagal mengambil data edukasi: " + error.message);
  }
};

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

export const deleteEdukasi = async (id) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query("DELETE FROM Edukasi WHERE id = ?", [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Gagal menghapus edukasi: " + error.message);
  }
};

export const getJumlahEdukasiFromDB = async () => {
  try {
    const [rows] = await db
      .getDbConnection()
      .query("SELECT COUNT(*) AS edukasi_count FROM Edukasi");
    return rows[0].edukasi_count;
  } catch (error) {
    console.error("Error fetching Edukasi count:", error);
    throw error;
  }
};