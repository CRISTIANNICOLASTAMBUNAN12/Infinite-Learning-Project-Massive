import * as komentarModel from '../models/komentarModel.js';


// Middleware untuk memeriksa apakah pengguna adalah pemilik komentar atau admin
export const cekPemilikKomentarAtauAdmin = async (req, res, next) => {
  const { id } = req.params; // ID komentar yang akan diupdate atau dihapus
  const userId = req.user.id; // ID pengguna yang sudah terverifikasi (dari token JWT)
  const userRole = req.user.peran; // Role pengguna (admin atau lainnya)

  try {
    // Ambil komentar dari database berdasarkan ID
    const komentar = await komentarModel.getKomentarById(id);

    if (!komentar) {
      return res.status(404).json({ message: 'Komentar tidak ditemukan' });
    }

    // Jika pengguna adalah admin atau pemilik komentar, lanjutkan
    if (komentar.pengguna_id === userId || userRole === 'admin') {
      return next(); // Lanjutkan ke route handler (update atau delete)
    }

    // Jika bukan pemilik atau admin, akses ditolak
    return res.status(403).json({ message: 'Akses ditolak, Anda tidak memiliki izin untuk mengedit atau menghapus komentar ini' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan dalam memeriksa pemilik komentar' });
  }
};
