import * as blogModel from "../models/blogModel.js";

// Menambahkan blog
export const addBlog = async (req, res) => {
  const { judul, konten, kategori } = req.body;
  const pengguna_id = req.user.id; // Pengguna yang sedang login

  try {
    const blogId = await blogModel.addBlog(
      pengguna_id,
      judul,
      konten,
      kategori
    );
    res.status(201).json({
      message: "Blog berhasil ditambahkan",
      data: { id: blogId, judul, konten, kategori },
    });
  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).json({
      message: "Gagal menambahkan blog",
      error: error.message,
    });
  }
};

// Mendapatkan semua blog
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.getAllBlogs();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mendapatkan blog",
      error: error.message,
    });
  }
};

// Mendapatkan blog berdasarkan ID
export const getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await blogModel.getBlogById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog tidak ditemukan" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mendapatkan blog",
      error: error.message,
    });
  }
};

// Menghapus blog berdasarkan ID
export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await blogModel.deleteBlog(id);
    if (!deleted) {
      return res.status(404).json({ message: "Blog tidak ditemukan" });
    }
    res.status(200).json({ message: "Blog berhasil dihapus" });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus blog",
      error: error.message,
    });
  }
};

// Mengupdate blog berdasarkan ID
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { judul, konten, kategori } = req.body;

  try {
    const updated = await blogModel.updateBlog(id, judul, konten, kategori);
    if (!updated) {
      return res.status(404).json({ message: "Blog tidak ditemukan" });
    }
    res.status(200).json({
      message: "Blog berhasil diperbarui",
      data: { id, judul, konten, kategori },
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({
      message: "Gagal memperbarui blog",
      error: error.message,
    });
  }
};
