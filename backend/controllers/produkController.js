import * as produkModel from "../models/produkModel.js";
import * as kategoriModel from "../models/kategoriModel.js"; // Pastikan impor ini ada

// Menambahkan produk
export const addProduk = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Pengguna tidak terverifikasi" });
  }

  const { nama, deskripsi, kategori_id, harga, lokasi, stok } = req.body;
  const pengguna_id = req.user.id; // Mengambil pengguna_id dari token JWT yang sudah diverifikasi

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

// Mendapatkan semua produk
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

// Mengupdate produk
export const updateProduk = async (req, res) => {
  const { produk_id } = req.params;
  const { nama, deskripsi, kategori_id, harga, lokasi, stok } = req.body;
  const pengguna_id = req.user.id;

  try {
    // Mengecek apakah produk ada
    const produkExist = await produkModel.getProdukById(produk_id);
    if (!produkExist) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    // Mengecek apakah kategori_id valid
    const kategoriExist = await kategoriModel.getKategoriById(kategori_id); // Memastikan kategori_id ada
    if (!kategoriExist) {
      return res.status(400).json({ message: "Kategori tidak ditemukan" });
    }

    // Memperbarui produk
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

// Menghapus produk
export const deleteProduk = async (req, res) => {
  const { produk_id } = req.params;
  const pengguna_id = req.user.id; // Mengambil pengguna_id dari token JWT yang sudah diverifikasi

  try {
    // Mengecek apakah produk ada
    const produkExist = await produkModel.getProdukById(produk_id);
    if (!produkExist) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    // Menghapus produk
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
