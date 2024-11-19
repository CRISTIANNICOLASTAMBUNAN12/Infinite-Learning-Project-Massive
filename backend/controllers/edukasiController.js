import * as edukasiModel from "../models/edukasiModel.js";
import { getJumlahEdukasiFromDB } from "../models/edukasiModel.js";
import db from "../config/db.js"; // Sesuaikan dengan path yang benar
import { getAktivitasTerbaruFromDB } from "../models/aktivitasModel.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addEdukasi = async (req, res) => {
  const { judul, konten, kategori_id } = req.body;
  const gambar = req.file ? req.file.path : null; // Mengambil path gambar dari file yang diupload

  try {
    // Menambahkan edukasi ke database
    const result = await edukasiModel.addEdukasi(
      judul,
      konten,
      kategori_id,
      gambar
    );

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
  const gambar = req.file ? req.file.path : null; // Menangkap gambar yang diupload

  try {
    const edukasi = await edukasiModel.getEdukasiById(id);

    if (!edukasi) {
      return res.status(404).json({ message: "Edukasi tidak ditemukan" });
    }

    // Menghapus gambar lama jika ada
    if (edukasi.gambar && gambar) {
      const gambarPath = path.join(__dirname, "..", edukasi.gambar);
      if (fs.existsSync(gambarPath)) {
        fs.unlinkSync(gambarPath); // Hapus gambar lama dari folder
      }
    }

    // Memperbarui edukasi
    const result = await edukasiModel.updateEdukasi(
      id,
      judul,
      konten,
      kategori_id,
      gambar
    );

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
    const edukasi = await edukasiModel.getEdukasiById(id);

    if (edukasi.gambar) {
      const gambarPath = path.join(__dirname, "..", edukasi.gambar);
      if (fs.existsSync(gambarPath)) {
        fs.unlinkSync(gambarPath); // Hapus gambar dari folder
      }
    }

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
