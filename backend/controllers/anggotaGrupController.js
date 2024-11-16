import * as anggotaGrupModel from "../models/anggotaGrupModel.js";
import * as grupPenggunaModel from "../models/grupPenggunaModel.js";
import * as penggunaModel from "../models/penggunaModel.js";

// Menambahkan anggota ke grup
export const addAnggotaToGrup = async (req, res) => {
  const { grup_id } = req.params;
  const pengguna_id = req.user.id; // Mengambil pengguna_id dari token JWT yang sudah diverifikasi

  try {
    console.log("Received grup_id:", grup_id);
    console.log("Logged in pengguna_id:", pengguna_id);

    // Memeriksa apakah grup ada
    const grup = await grupPenggunaModel.getGrupPenggunaById(grup_id);
    if (!grup) {
      return res.status(404).json({ message: "Grup tidak ditemukan" });
    }

    // Menambahkan anggota ke grup
    const anggota = await anggotaGrupModel.addAnggotaGrup(grup_id, pengguna_id);

    // Mengecek jika anggota berhasil ditambahkan
    if (!anggota) {
      return res.status(400).json({
        message:
          "Gagal menambahkan anggota ke grup, mungkin sudah ada anggota dengan ID yang sama",
      });
    }

    res.status(200).json({
      message: "Anggota berhasil ditambahkan ke grup",
      data: anggota,
    });
  } catch (error) {
    console.error("Error adding member:", error);

    // Menangani duplikasi dan error lain
    if (error.message.includes("Duplicate entry")) {
      return res.status(400).json({
        message: "Anggota sudah ada dalam grup ini",
      });
    }

    res.status(500).json({
      message: "Gagal menambahkan anggota ke grup",
      error: error.message,
    });
  }
};

// Mendapatkan semua anggota dari grup
export const getAnggotaFromGrup = async (req, res) => {
  const { grup_id } = req.params;

  try {
    const anggota = await anggotaGrupModel.getAnggotaByGrup(grup_id);
    res.status(200).json(anggota);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mendapatkan anggota grup",
      error: error.message,
    });
  }
};

// Menghapus anggota dari grup
export const deleteAnggotaFromGrup = async (req, res) => {
  const { grup_id } = req.params;
  const pengguna_id = req.user.id; // Mengambil pengguna_id dari token JWT yang sudah diverifikasi

  try {
    // Memastikan anggota ada sebelum mencoba menghapus
    const anggotaExists = await anggotaGrupModel.getAnggotaByGrupAndPengguna(grup_id, pengguna_id);
    if (!anggotaExists) {
      return res.status(404).json({ message: "Anggota tidak ditemukan dalam grup ini" });
    }

    // Menghapus anggota
    const deleted = await anggotaGrupModel.deleteAnggotaGrup(grup_id, pengguna_id);
    if (!deleted) {
      return res.status(404).json({ message: "Gagal menghapus anggota" });
    }

    res.status(200).json({ message: "Anggota berhasil dihapus dari grup" });
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({
      message: "Gagal menghapus anggota",
      error: error.message,
    });
  }
};


