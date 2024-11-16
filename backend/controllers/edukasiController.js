import * as edukasiModel from "../models/edukasiModel.js";

// Controller untuk menambahkan edukasi
export const addEdukasi = async (req, res) => {
  const { judul, konten, kategori_id } = req.body;

  try {
    const result = await edukasiModel.addEdukasi(judul, konten, kategori_id);
    res.status(201).json({ message: "Edukasi berhasil ditambahkan", result });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menambahkan edukasi",
      error: error.message,
    });
  }
};

// Controller untuk mendapatkan semua edukasi
export const getEdukasi = async (req, res) => {
  try {
    const edukasi = await edukasiModel.getEdukasi();
    res.status(200).json(edukasi);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data edukasi",
      error: error.message,
    });
  }
};

// Controller untuk mendapatkan edukasi berdasarkan ID
export const getEdukasiById = async (req, res) => {
  const { id } = req.params;

  try {
    const edukasi = await edukasiModel.getEdukasiById(id);
    if (!edukasi) {
      return res.status(404).json({ message: "Edukasi tidak ditemukan" });
    }
    res.status(200).json(edukasi);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data edukasi",
      error: error.message,
    });
  }
};

// Controller untuk memperbarui edukasi
export const updateEdukasi = async (req, res) => {
  const { id } = req.params;
  const { judul, konten, kategori_id } = req.body;

  try {
    const result = await edukasiModel.updateEdukasi(id, judul, konten, kategori_id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Edukasi tidak ditemukan" });
    }
    res.status(200).json({ message: "Edukasi berhasil diperbarui", result });
  } catch (error) {
    res.status(500).json({
      message: "Gagal memperbarui edukasi",
      error: error.message,
    });
  }
};

// Controller untuk menghapus edukasi
export const deleteEdukasi = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await edukasiModel.deleteEdukasi(id);
    if (!deleted) {
      return res.status(404).json({ message: "Edukasi tidak ditemukan" });
    }
    res.status(200).json({ message: "Edukasi berhasil dihapus" });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus edukasi",
      error: error.message,
    });
  }
};
