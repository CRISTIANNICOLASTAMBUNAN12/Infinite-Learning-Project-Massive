import * as pasarModel from "../models/pasarModel.js";

// Controller untuk menambahkan pasar
export const addPasar = async (req, res) => {
  const { produk_id, lokasi, deskripsi } = req.body;
  const pengguna_id = req.user.id; // Mengambil pengguna_id dari token JWT yang sudah diverifikasi

  try {
    const result = await pasarModel.addPasar(
      produk_id,
      pengguna_id,
      lokasi,
      deskripsi
    );
    res.status(201).json({ message: "Pasar berhasil ditambahkan", result });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menambahkan pasar",
      error: error.message,
    });
  }
};

// Controller untuk mendapatkan semua pasar
export const getPasar = async (req, res) => {
  try {
    const pasar = await pasarModel.getPasar();
    res.status(200).json(pasar);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data pasar",
      error: error.message,
    });
  }
};

// Controller untuk mendapatkan pasar berdasarkan ID
export const getPasarById = async (req, res) => {
  const { id } = req.params;

  try {
    const pasar = await pasarModel.getPasarById(id);
    if (!pasar) {
      return res.status(404).json({ message: "Pasar tidak ditemukan" });
    }
    res.status(200).json(pasar);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data pasar",
      error: error.message,
    });
  }
};

// Controller untuk menghapus pasar berdasarkan ID
export const deletePasar = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await pasarModel.deletePasar(id);
    if (!deleted) {
      return res.status(404).json({ message: "Pasar tidak ditemukan" });
    }
    res.status(200).json({ message: "Pasar berhasil dihapus" });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus pasar",
      error: error.message,
    });
  }
};

export const updatePasar = async (req, res) => {
  const { id } = req.params;
  const { produk_id, lokasi, deskripsi } = req.body;

  try {
    // Panggil model untuk memperbarui pasar
    const result = await pasarModel.updatePasar(
      id,
      produk_id,
      lokasi,
      deskripsi
    );

    // Jika tidak ada pasar yang ditemukan dengan ID tersebut
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pasar tidak ditemukan" });
    }

    res.status(200).json({ message: "Pasar berhasil diperbarui", result });
  } catch (error) {
    res.status(500).json({
      message: "Gagal memperbarui pasar",
      error: error.message,
    });
  }
};