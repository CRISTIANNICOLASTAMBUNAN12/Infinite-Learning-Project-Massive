import db from "../config/db.js";

// Menambahkan produk baru
export const addProduk = async (
  pengguna_id,
  nama,
  deskripsi,
  kategori_id,
  harga,
  lokasi,
  stok
) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query(
        "INSERT INTO Produk (pengguna_id, nama, deskripsi, kategori_id, harga, lokasi, stok) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [pengguna_id, nama, deskripsi, kategori_id, harga, lokasi, stok]
      );
    return result.insertId; // Mengembalikan ID produk yang baru dibuat
  } catch (error) {
    throw new Error("Gagal menambahkan produk: " + error.message);
  }
};

// Mendapatkan semua produk
export const getAllProduk = async () => {
  try {
    const [produk] = await db.getDbConnection().query("SELECT * FROM Produk");
    return produk;
  } catch (error) {
    throw new Error("Gagal mengambil semua produk: " + error.message);
  }
};

// Mendapatkan produk berdasarkan ID
export const getProdukById = async (id) => {
  try {
    const [produk] = await db
      .getDbConnection()
      .query("SELECT * FROM Produk WHERE id = ?", [id]);
    return produk.length > 0 ? produk[0] : null;
  } catch (error) {
    throw new Error("Gagal mengambil produk: " + error.message);
  }
};

// Mengupdate produk berdasarkan ID
export const updateProduk = async (
  produk_id,
  pengguna_id,
  nama,
  deskripsi,
  kategori_id,
  harga,
  lokasi,
  stok
) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query(
        "UPDATE Produk SET nama = ?, deskripsi = ?, kategori_id = ?, harga = ?, lokasi = ?, stok = ? WHERE id = ? AND pengguna_id = ?",
        [
          nama,
          deskripsi,
          kategori_id,
          harga,
          lokasi,
          stok,
          produk_id,
          pengguna_id,
        ]
      );

    if (result.affectedRows === 0) {
      throw new Error("Produk tidak ditemukan atau Anda tidak memiliki akses");
    }
    return result;
  } catch (error) {
    throw new Error("Gagal memperbarui produk: " + error.message);
  }
};

// Menghapus produk berdasarkan ID
export const deleteProduk = async (id) => {
  try {
    const [result] = await db
      .getDbConnection()
      .query("DELETE FROM Produk WHERE id = ?", [id]);
    return result.affectedRows > 0; // Mengembalikan true jika produk berhasil dihapus
  } catch (error) {
    throw new Error("Gagal menghapus produk: " + error.message);
  }
};
