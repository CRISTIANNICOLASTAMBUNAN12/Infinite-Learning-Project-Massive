import db from "../config/db.js";

// Mendapatkan semua thread berdasarkan forum_id
export const getThreadsByForumId = async (forumId) => {
  try {
    const pool = db.getDbConnection();
    const [threads] = await pool.query(
      "SELECT * FROM Thread WHERE forum_id = ? ORDER BY dibuat_pada DESC",
      [forumId]
    );
    return threads;
  } catch (error) {
    throw new Error("Error fetching threads: " + error.message);
  }
};

// Menambahkan thread baru
export const addThread = async (forumId, penggunaId, judul, konten) => {
  try {
    const pool = db.getDbConnection();
    const [result] = await pool.query(
      "INSERT INTO Thread (forum_id, pengguna_id, judul, konten) VALUES (?, ?, ?, ?)",
      [forumId, penggunaId, judul, konten]
    );
    return { id: result.insertId, forumId, penggunaId, judul, konten };
  } catch (error) {
    throw new Error("Error while creating thread: " + error.message);
  }
};

// Mendapatkan thread berdasarkan ID
export const getThreadById = async (id) => {
  try {
    const pool = db.getDbConnection();
    const [thread] = await pool.query("SELECT * FROM Thread WHERE id = ?", [
      id,
    ]);
    return thread[0];
  } catch (error) {
    throw new Error("Error fetching thread: " + error.message);
  }
};

// Menghapus thread berdasarkan ID
export const deleteThread = async (id) => {
  try {
    const pool = db.getDbConnection();
    await pool.query("DELETE FROM Thread WHERE id = ?", [id]);
  } catch (error) {
    throw new Error("Error deleting thread: " + error.message);
  }
};

export const updateThread = async (id, judul, konten) => {
  try {
    const pool = db.getDbConnection();
    const [result] = await pool.query(
      "UPDATE Thread SET judul = ?, konten = ? WHERE id = ?",
      [judul, konten, id]
    );
    return result;
  } catch (error) {
    throw new Error("Error while updating thread: " + error.message);
  }
};
