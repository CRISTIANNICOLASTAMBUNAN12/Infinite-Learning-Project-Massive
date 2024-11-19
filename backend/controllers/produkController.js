import * as produkModel from "../models/produkModel.js";
import * as kategoriModel from "../models/kategoriModel.js";
import { getJumlahProdukFromDB } from "../models/produkModel.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addProduk = async (req, res) => {
  try {
    const penggunaId = req.user.id;
    const { nama, deskripsi, kategori_id, harga, lokasi, stok } = req.body;

    let gambarPath = null;

    // Jika gambar di-upload, simpan path file gambar
    if (req.file) {
      gambarPath = `/uploads/${req.file.filename}`;
    }

    if (!nama || !kategori_id || !harga || !lokasi || stok == null) {
      return res.status(400).json({
        success: false,
        message: "Field yang wajib diisi tidak boleh kosong",
      });
    }

    await produkModel.addProduk(
      penggunaId,
      nama,
      deskripsi,
      kategori_id,
      harga,
      lokasi,
      stok,
      gambarPath
    );

    res.status(201).json({
      success: true,
      message: "Produk berhasil ditambahkan",
    });
  } catch (error) {
    console.error("Error adding produk:", error);
    res.status(500).json({
      success: false,
      message: "Gagal menambahkan produk",
    });
  }
};

export const getAllProduk = async (req, res) => {
  try {
    const produk = await produkModel.getAllProduk();
    res.status(200).json(produk);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mendapatkan produk",
      error: error.message,
    });
  }
};

export const updateProduk = async (req, res) => {
  try {
    const { produk_id } = req.params;
    const { nama, deskripsi, kategori_id, harga, lokasi, stok } = req.body;

    // Ambil data produk lama
    const produkLama = await produkModel.getProdukById(produk_id);

    if (!produkLama) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    let gambarPath = produkLama.gambar;

    // Hapus gambar lama jika ada dan ada gambar baru yang di-upload
    if (req.file) {
      if (gambarPath) {
        const oldImagePath = path.join(__dirname, "..", gambarPath);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      gambarPath = `/uploads/${req.file.filename}`;
    }

    await produkModel.updateProduk(
      produk_id,
      nama,
      deskripsi,
      kategori_id,
      harga,
      lokasi,
      stok,
      gambarPath
    );

    res.status(200).json({
      success: true,
      message: "Produk berhasil diperbarui",
    });
  } catch (error) {
    console.error("Error updating produk:", error);
    res.status(500).json({
      success: false,
      message: "Gagal memperbarui produk",
    });
  }
};

export const deleteProduk = async (req, res) => {
  try {
    const { produk_id } = req.params;

    // Ambil data produk untuk mendapatkan gambar
    const produk = await produkModel.getProdukById(produk_id);

    if (!produk) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    // Hapus gambar jika ada
    if (produk.gambar) {
      const gambarPath = path.join(__dirname, "..", produk.gambar);
      if (fs.existsSync(gambarPath)) {
        fs.unlinkSync(gambarPath);
      }
    }

    await produkModel.deleteProduk(produk_id);

    res.status(200).json({
      success: true,
      message: "Produk berhasil dihapus beserta gambar",
    });
  } catch (error) {
    console.error("Error deleting produk:", error);
    res.status(500).json({
      success: false,
      message: "Gagal menghapus produk",
    });
  }
};

export const getJumlahProduk = async (req, res) => {
  try {
    const jumlahProduk = await getJumlahProdukFromDB();
    res.json({ count: jumlahProduk });
  } catch (error) {
    console.error("Error fetching product count:", error);
    res.status(500).send("Server Error");
  }
};
