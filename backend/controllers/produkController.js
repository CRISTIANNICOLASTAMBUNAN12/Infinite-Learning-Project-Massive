import * as produkModel from "../models/produkModel.js";
import * as kategoriModel from "../models/kategoriModel.js";
import { getJumlahProdukFromDB } from "../models/produkModel.js";
  
export const addProduk = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Pengguna tidak terverifikasi" });
  }

  const { nama, deskripsi, kategori_id, harga, lokasi, stok } = req.body;
  const pengguna_id = req.user.id;

  try {
    const id = await produkModel.addProduk(
      pengguna_id,
      nama,
      deskripsi,
      kategori_id,
      harga,
      lokasi,
      stok
    );
    res.status(201).json({
      message: "Produk berhasil ditambahkan",
      data: {
        id,
        pengguna_id,
        nama,
        deskripsi,
        kategori_id,
        harga,
        lokasi,
        stok,
      },
    });
  } catch (error) {
    console.error("Error adding produk:", error);
    res.status(500).json({
      message: "Gagal menambahkan produk",
      error: error.message,
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
  const { produk_id } = req.params;
  const { nama, deskripsi, kategori_id, harga, lokasi, stok } = req.body;
  const pengguna_id = req.user.id;

  try {
    const produkExist = await produkModel.getProdukById(produk_id);
    if (!produkExist) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    const kategoriExist = await kategoriModel.getKategoriById(kategori_id);
    if (!kategoriExist) {
      return res.status(400).json({ message: "Kategori tidak ditemukan" });
    }
    const updatedProduk = await produkModel.updateProduk(
      produk_id,
      pengguna_id,
      nama,
      deskripsi,
      kategori_id,
      harga,
      lokasi,
      stok
    );
    res.status(200).json({
      message: "Produk berhasil diperbarui",
      data: updatedProduk,
    });
  } catch (error) {
    console.error("Error updating produk:", error);
    res.status(500).json({
      message: "Gagal memperbarui produk",
      error: error.message,
    });
  }
};

export const deleteProduk = async (req, res) => {
  const { produk_id } = req.params;
  const pengguna_id = req.user.id;

  try {
    const produkExist = await produkModel.getProdukById(produk_id);
    if (!produkExist) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    const deletedProduk = await produkModel.deleteProduk(
      produk_id,
      pengguna_id
    );
    if (!deletedProduk) {
      return res.status(400).json({ message: "Gagal menghapus produk" });
    }
    res.status(200).json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting produk:", error);
    res.status(500).json({
      message: "Gagal menghapus produk",
      error: error.message,
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
