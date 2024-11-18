import * as edukasiModel from "../models/edukasiModel.js";
import { getJumlahEdukasiFromDB } from "../models/edukasiModel.js";
import db from "../config/db.js"; // Sesuaikan dengan path yang benar
import { getAktivitasTerbaruFromDB } from "../models/aktivitasModel.js";

export const addEdukasi = async (req, res) => {
  const { judul, konten, kategori_id } = req.body;

  try {
    // Menambahkan edukasi ke database
    const result = await edukasiModel.addEdukasi(judul, konten, kategori_id);

    // Mengirimkan respons sukses
    res.status(201).json({ message: "Edukasi berhasil ditambahkan", result });

    // Log aktivitas setelah respons dikirim
    await db
      .getDbConnection()
      .execute(
        "INSERT INTO aktivitas (jenis_aktivitas, deskripsi) VALUES (?, ?)",
        [
          "Edukasi terbaru",
          `Edukasi terbaru dengan judul ${judul} telah dipublikasikan.`,
        ]
      );
  } catch (error) {
    // Jika terjadi error, kirimkan respons error
    res.status(500).json({
      message: "Gagal menambahkan edukasi",
      error: error.message,
    });
  }
};

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

export const updateEdukasi = async (req, res) => {
  const { id } = req.params;
  const { judul, konten, kategori_id } = req.body;

  try {
    const result = await edukasiModel.updateEdukasi(
      id,
      judul,
      konten,
      kategori_id
    );
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

export const getJumlahEdukasi = async (req, res) => {
  try {
    const jumlahEdukasi = await getJumlahEdukasiFromDB();
    res.json({ count: jumlahEdukasi });
  } catch (error) {
    console.error("Error fetching Edukasi count:", error);
    res.status(500).send("Server Error");
  }
};
