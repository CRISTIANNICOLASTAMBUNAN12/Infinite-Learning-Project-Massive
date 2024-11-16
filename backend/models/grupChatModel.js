import db from "../config/db.js";

// Menambahkan pesan ke grup chat
export const addPesanToGrupChat = async (grup_id, pengguna_id, pesan) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query(
        "INSERT INTO GrupChat (grup_id, pengguna_id, pesan) VALUES (?, ?, ?)",
        [grup_id, pengguna_id, pesan]
      );
    return result.affectedRows > 0; // Mengembalikan true jika pesan berhasil ditambahkan
  } catch (error) {
    throw new Error("Gagal menambahkan pesan: " + error.message);
  }
};

// Mengambil pesan berdasarkan grup ID
export const getPesanByGrup = async (grup_id) => {
  try {
    const [pesan] = await db
      .getDbConnection()
      .query("SELECT * FROM GrupChat WHERE grup_id = ? ORDER BY waktu ASC", [
        grup_id,
      ]);
    return pesan;
  } catch (error) {
    throw new Error("Gagal mengambil pesan: " + error.message);
  }
};

// Menghapus pesan dari GrupChat
export const deletePesanGrupChat = async (grup_id, pesan_id) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query("DELETE FROM GrupChat WHERE grup_id = ? AND id = ?", [
        grup_id,
        pesan_id,
      ]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Gagal menghapus pesan: " + error.message);
  }
};

// models/grupChatModel.js
export const getPesanById = async (grup_id, pesan_id) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query("SELECT * FROM GrupChat WHERE grup_id = ? AND id = ?", [
        grup_id,
        pesan_id,
      ]);
    console.log("Result of getPesanById:", result); // Menambahkan log untuk hasil query
    return result.length > 0 ? result[0] : null; // Mengembalikan pesan jika ditemukan
  } catch (error) {
    console.error("Error fetching message:", error);
    throw new Error("Gagal mengambil pesan: " + error.message);
  }
};