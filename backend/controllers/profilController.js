import * as profilModel from "../models/profilModel.js";

// Controller untuk menambahkan profil
export const addProfil = async (req, res) => {
  try {
    const penggunaId = req.user.id; // Mengambil ID pengguna dari token yang sudah diverifikasi
    const { nama, lokasi, metode_pertanian, produk_ditawarkan, bio } = req.body;

    // Validasi data
    if (!nama || !lokasi || !metode_pertanian || !produk_ditawarkan || !bio) {
      return res.status(400).json({
        success: false,
        message: "Semua field harus diisi",
      });
    }

    // Tambahkan profil ke database
    await profilModel.addProfil(
      penggunaId,
      nama,
      lokasi,
      metode_pertanian,
      produk_ditawarkan,
      bio
    );

    res.status(201).json({
      success: true,
      message: "Profil berhasil ditambahkan",
    });
  } catch (error) {
    console.error("Error adding profile:", error);
    res.status(500).json({
      success: false,
      message: "Gagal menambahkan profil",
    });
  }
};

// Mendapatkan profil pengguna
export const getProfil = async (req, res) => {
  try {
    const penggunaId = req.user.id; // Mengambil pengguna_id dari JWT token

    const profil = await profilModel.getProfilByPenggunaId(penggunaId);

    if (!profil) {
      return res.status(404).json({
        success: false,
        message: "Profil tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      data: profil,
    });
  } catch (error) {
    console.error("Error fetching profil:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil profil",
    });
  }
};

// Controller untuk membuat atau memperbarui profil
export const upsertProfil = async (req, res) => {
  try {
    const penggunaId = req.user.id; // Mengambil pengguna_id dari JWT token
    const { nama, lokasi, metode_pertanian, produk_ditawarkan, bio } = req.body;

    // Panggil fungsi upsertProfil
    const result = await profilModel.upsertProfil(
      penggunaId,
      nama,
      lokasi,
      metode_pertanian,
      produk_ditawarkan,
      bio
    );

    res.status(200).json({
      success: true,
      message: "Profil berhasil disimpan",
      data: result,
    });
  } catch (error) {
    console.error("Error saving profil:", error);
    res.status(500).json({
      success: false,
      message: "Gagal menyimpan profil",
    });
  }
};

// Menghapus profil pengguna
export const deleteProfil = async (req, res) => {
  try {
    const pengguna_id = req.user.id; // Mengambil ID pengguna dari token JWT

    const result = await profilModel.deleteProfil(pengguna_id);
    res.status(200).json({ success: true, message: "Profil berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting profil:", error);
    res.status(500).json({ success: false, message: "Gagal menghapus profil" });
  }
};
