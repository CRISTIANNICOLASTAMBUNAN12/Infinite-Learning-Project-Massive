import db from "../config/db.js";

export const addBlog = async (pengguna_id, judul, konten, kategori) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query(
        "INSERT INTO Blog (pengguna_id, judul, konten, kategori) VALUES (?, ?, ?, ?)",
        [pengguna_id, judul, konten, kategori]
      );
    return result.insertId;
  } catch (error) {
    throw new Error("Gagal menambahkan blog: " + error.message);
  }
};

export const getAllBlogs = async () => {
  try {
    const [blogs] = await db
      .getDbConnection()
      .query("SELECT * FROM Blog ORDER BY dibuat_pada DESC");
    return blogs;
  } catch (error) {
    throw new Error("Gagal mendapatkan blog: " + error.message);
  }
};

export const getBlogById = async (id) => {
  try {
    const [blog] = await db
      .getDbConnection()
      .query("SELECT * FROM Blog WHERE id = ?", [id]);
    return blog[0];
  } catch (error) {
    throw new Error("Gagal mendapatkan blog: " + error.message);
  }
};

export const deleteBlog = async (id) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query("DELETE FROM Blog WHERE id = ?", [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Gagal menghapus blog: " + error.message);
  }
};

export const updateBlog = async (id, judul, konten, kategori) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query(
        "UPDATE Blog SET judul = ?, konten = ?, kategori = ? WHERE id = ?",
        [judul, konten, kategori, id]
      );
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Gagal memperbarui blog: " + error.message);
  }
};
