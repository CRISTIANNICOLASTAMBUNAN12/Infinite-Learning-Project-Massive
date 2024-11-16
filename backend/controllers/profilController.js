import * as profilModel from "../models/profilModel.js";

export const addProfil = async (req, res) => {
  try {
    const penggunaId = req.user.id;
    const { nama, lokasi, metode_pertanian, produk_ditawarkan, bio } = req.body;

    if (!nama || !lokasi || !metode_pertanian || !produk_ditawarkan || !bio) {
      return res.status(400).json({
        success: false,
        message: "Semua field harus diisi",
      });
    }

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

export const getProfil = async (req, res) => {
  try {
    const penggunaId = req.user.id;

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

export const upsertProfil = async (req, res) => {
  try {
    const penggunaId = req.user.id;
    const { nama, lokasi, metode_pertanian, produk_ditawarkan, bio } = req.body;

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

export const deleteProfil = async (req, res) => {
  try {
    const pengguna_id = req.user.id;

    const result = await profilModel.deleteProfil(pengguna_id);
    res.status(200).json({ success: true, message: "Profil berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting profil:", error);
    res.status(500).json({ success: false, message: "Gagal menghapus profil" });
  }
};
