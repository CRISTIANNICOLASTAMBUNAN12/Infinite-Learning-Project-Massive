import db from "../config/db.js";

export const addChat = async (pengirim_id, penerima_id, pesan) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query(
        "INSERT INTO Chat (pengirim_id, penerima_id, pesan) VALUES (?, ?, ?)",
        [pengirim_id, penerima_id, pesan]
      );
    return result.insertId;
  } catch (error) {
    throw new Error("Gagal menambahkan pesan: " + error.message);
  }
};

export const getChatByPengirimPenerima = async (pengirim_id, penerima_id) => {
  try {
    const [pesan] = await db
      .getDbConnection()
      .query(
        "SELECT * FROM Chat WHERE (pengirim_id = ? AND penerima_id = ?) OR (pengirim_id = ? AND penerima_id = ?)",
        [pengirim_id, penerima_id, penerima_id, pengirim_id]
      );
    return pesan;
  } catch (error) {
    throw new Error("Gagal mengambil pesan: " + error.message);
  }
};

export const deleteChat = async (id) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query("DELETE FROM Chat WHERE id = ?", [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Gagal menghapus pesan: " + error.message);
  }
};

export const getChatById = async (id) => {
  try {
    const [pesan] = await db
      .getDbConnection()
      .query("SELECT * FROM Chat WHERE id = ?", [id]);
    return pesan[0];
  } catch (error) {
    throw new Error("Gagal mengambil pesan: " + error.message);
  }
};
