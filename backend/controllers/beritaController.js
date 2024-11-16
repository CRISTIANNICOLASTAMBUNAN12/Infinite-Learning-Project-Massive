// controllers/beritaController.js
import * as beritaModel from "../models/beritaModel.js";

// Menambahkan berita baru
export const addBerita = async (req, res) => {
  const { judul, konten } = req.body;

  try {
    const id = await beritaModel.addBerita(judul, konten);
    res.status(201).json({
      message: "Berita berhasil ditambahkan",
      data: { id, judul, konten },
    });
  } catch (error) {
    console.error("Error adding berita:", error);
    res.status(500).json({
      message: "Gagal menambahkan berita",
      error: error.message,
    });
  }
};

// Mendapatkan semua berita
export const getAllBerita = async (req, res) => {
  try {
    const berita = await beritaModel.getAllBerita();
    res.status(200).json(berita);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mendapatkan berita",
      error: error.message,
    });
  }
};

// Mendapatkan berita berdasarkan ID
export const getBeritaById = async (req, res) => {
  const { id } = req.params;

  try {
    const berita = await beritaModel.getBeritaById(id);
    if (!berita) {
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    }
    res.status(200).json(berita);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mendapatkan berita",
      error: error.message,
    });
  }
};

// Mengupdate berita berdasarkan ID
export const updateBerita = async (req, res) => {
  const { id } = req.params;
  const { judul, konten } = req.body;

  try {
    const updated = await beritaModel.updateBerita(id, judul, konten);
    if (!updated) {
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    }
    res.status(200).json({
      message: "Berita berhasil diperbarui",
      data: { id, judul, konten },
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal memperbarui berita",
      error: error.message,
    });
  }
};

// Menghapus berita berdasarkan ID
export const deleteBerita = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await beritaModel.deleteBerita(id);
    if (!deleted) {
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    }
    res.status(200).json({ message: "Berita berhasil dihapus" });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus berita",
      error: error.message,
    });
  }
};
