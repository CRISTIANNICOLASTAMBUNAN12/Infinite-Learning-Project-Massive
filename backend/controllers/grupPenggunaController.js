import * as grupPenggunaModel from "../models/grupPenggunaModel.js";

// Menambahkan grup pengguna baru
export const addGrupPengguna = async (req, res) => {
  const { nama, deskripsi } = req.body;
  const { id: penggunaId } = req.user; // Pengguna yang sedang login

  try {
    const grup = await grupPenggunaModel.addGrupPengguna(
      nama,
      deskripsi,
      penggunaId
    );
    res.status(201).json({
      message: "Grup pengguna berhasil dibuat",
      data: grup,
    });
  } catch (error) {
    console.error("Error adding group:", error);
    res.status(500).json({
      message: "Gagal membuat grup pengguna",
      error: error.message,
    });
  }
};

// Mendapatkan semua grup pengguna
export const getAllGrupPengguna = async (req, res) => {
  try {
    const grupPengguna = await grupPenggunaModel.getAllGrupPengguna();
    res.status(200).json(grupPengguna);
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({
      message: "Gagal mendapatkan grup pengguna",
      error: error.message,
    });
  }
};

// Mengupdate grup pengguna
export const updateGrupPengguna = async (req, res) => {
  const { id } = req.params; // ID grup dari URL parameter
  const { nama, deskripsi } = req.body; // Nama dan deskripsi dari body request

  try {
    // Memperbarui grup pengguna dengan memanggil fungsi model
    const updatedGrup = await grupPenggunaModel.updateGrupPengguna(
      id,
      nama,
      deskripsi
    ); // Gunakan grupPenggunaModel
    if (!updatedGrup) {
      return res.status(404).json({ message: "Grup tidak ditemukan" });
    }

    // Mengirimkan response setelah sukses memperbarui
    res.status(200).json({
      message: "Grup berhasil diperbarui",
      data: updatedGrup, // Data yang sudah diperbarui
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal memperbarui grup" });
  }
};

export const deleteGrupPengguna = async (req, res) => {
  const { id } = req.params; // ID grup dari URL parameter

  try {
    // Memanggil fungsi model untuk menghapus grup pengguna
    const deletedGrup = await grupPenggunaModel.deleteGrupPengguna(id);
    if (!deletedGrup) {
      return res.status(404).json({ message: "Grup tidak ditemukan" });
    }

    // Mengirimkan response setelah sukses menghapus
    res.status(200).json({
      message: "Grup berhasil dihapus",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menghapus grup" });
  }
};

export const getGrupPenggunaById = async (req, res) => {
  const { id } = req.params;

  try {
    const grup = await grupPenggunaModel.getGrupPenggunaById(id);
    if (!grup) {
      return res.status(404).json({ message: "Grup tidak ditemukan" });
    }

    res.status(200).json(grup);
  } catch (error) {
    console.error("Error fetching group by ID:", error);
    res
      .status(500)
      .json({ message: "Gagal mendapatkan grup", error: error.message });
  }
};
