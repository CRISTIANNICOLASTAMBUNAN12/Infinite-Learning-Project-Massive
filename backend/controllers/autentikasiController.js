import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as penggunaModel from "../models/penggunaModel.js";
import * as autentikasiModel from "../models/autentikasiModel.js";

// Fungsi untuk login dan membuat token
export const loginPengguna = async (req, res) => {
  const { email, kata_sandi } = req.body;

  try {
    const pengguna = await penggunaModel.getPenggunaByEmail(email);

    if (!pengguna) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    // Verifikasi kata sandi
    const isPasswordMatch = await bcrypt.compare(
      kata_sandi,
      pengguna.kata_sandi
    );
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Kata sandi salah" });
    }

    // Buat payload token
    const payload = {
      id: pengguna.id,
      email: pengguna.email,
      peran: pengguna.peran,
    };

    // Generate JWT token
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "your_secret_key",
      {
        expiresIn: "1h", // Token berlaku selama 1 jam
      }
    );

    // Berikan respon login berhasil beserta token
    res.json({
      message: "Login berhasil",
      token,
      pengguna: {
        id: pengguna.id,
        nama: pengguna.nama,
        email: pengguna.email,
        peran: pengguna.peran,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Terjadi kesalahan saat login" });
  }
};

// Fungsi untuk logout
export const logoutPengguna = async (req, res) => {
  const { pengguna_id } = req.body;

  try {
    // Menghapus token yang terkait dengan pengguna
    await autentikasiModel.deleteAutentikasiByPenggunaId(pengguna_id);
    res.status(200).json({ success: true, message: "Logout berhasil" });
  } catch (error) {
    console.error("Logout error:", error);
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan di server" });
  }
};
