import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as penggunaModel from "../models/penggunaModel.js";
import * as autentikasiModel from "../models/autentikasiModel.js";
import db from '../config/db.js'; // Sesuaikan dengan path yang benar
import { getAktivitasTerbaruFromDB } from '../models/aktivitasModel.js'; 

export const loginPengguna = async (req, res) => {
  const { email, kata_sandi } = req.body;

  try {
    const pengguna = await penggunaModel.getPenggunaByEmail(email);

    if (!pengguna) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    const isPasswordMatch = await bcrypt.compare(
      kata_sandi,
      pengguna.kata_sandi
    );
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Kata sandi salah" });
    }

    const payload = {
      id: pengguna.id,
      email: pengguna.email,
      peran: pengguna.peran,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "your_secret_key",
      {
        expiresIn: "1h",
      }
    );

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

export const registrasiPengguna = async (req, res) => {
  const {
    nama,
    email,
    kata_sandi,
    peran,
    pengalaman,
    tentang,
    alamat,
    jenis_kelamin,
    pekerjaan,
    no_hp,
  } = req.body;

  try {
    const existingUser = await penggunaModel.getPenggunaByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(kata_sandi, salt);

    const newUser = await penggunaModel.addPengguna({
      nama,
      email,
      pengalaman,
      tentang,
      alamat,
      jenis_kelamin,
      pekerjaan,
      no_hp,
      kata_sandi: hashedPassword,
      peran,
    });

    // Log aktivitas pengguna baru dengan memanfaatkan fungsi aktivitasModel
    await db.getDbConnection().execute(
      "INSERT INTO aktivitas (jenis_aktivitas, deskripsi) VALUES (?, ?)",
      [
        "Pengguna Baru",
        `Pengguna baru dengan nama ${nama} telah mendaftar.`
      ]
    );

    // Mengambil aktivitas terbaru setelah berhasil registrasi
    const aktivitasTerbaru = await getAktivitasTerbaruFromDB();
    
    res.status(201).json({
      message: "Registrasi berhasil",
      pengguna: {
        id: newUser.insertId,
        nama,
        email,
        peran,
      },
      aktivitasTerbaru, // Menyertakan aktivitas terbaru dalam respon
    });
  } catch (err) {
    console.error("Registrasi error:", err);
    res.status(500).json({ message: "Terjadi kesalahan saat registrasi" });
  }
};

export const updatePengguna = async (req, res) => {
  const id = req.params.id;
  const {
    nama,
    email,
    kata_sandi,
    peran,
    pengalaman,
    tentang,
    alamat,
    jenis_kelamin,
    pekerjaan,
    no_hp,
  } = req.body;

  try {
    const pengguna = await penggunaModel.getPenggunaById(id);
    if (!pengguna) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    let hashedPassword = kata_sandi;
    if (kata_sandi) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(kata_sandi, salt);
    }

    const dataUpdate = {
      nama,
      email,
      pengalaman,
      tentang,
      alamat,
      jenis_kelamin,
      pekerjaan,
      no_hp,
      kata_sandi: hashedPassword,
      peran,
    };

    await penggunaModel.updatePengguna(id, dataUpdate);

    res.status(200).json({
      message: "Pengguna berhasil diperbarui",
    });
  } catch (err) {
    console.error("Update error:", err);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat memperbarui pengguna" });
  }
};

export const deletePengguna = async (req, res) => {
  const id = req.params.id;

  try {
    const pengguna = await penggunaModel.getPenggunaById(id);
    if (!pengguna) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    await penggunaModel.deletePengguna(id);

    res.status(200).json({
      message: "Pengguna berhasil dihapus",
    });
  } catch (err) {
    console.error("Delete error:", err);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat menghapus pengguna" });
  }
};

export const logoutPengguna = async (req, res) => {
  const { pengguna_id } = req.body;

  try {
    await autentikasiModel.deleteAutentikasiByPenggunaId(pengguna_id);
    res.status(200).json({ success: true, message: "Logout berhasil" });
  } catch (error) {
    console.error("Logout error:", error);
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan di server" });
  }
};

export const getAllPengguna = async (req, res) => {
  try {
    const pengguna = await penggunaModel.getAllPengguna();
    res.status(200).json({
      message: "Pengguna berhasil ditemukan",
      pengguna: pengguna,
    });
  } catch (err) {
    console.error("Get all pengguna error:", err);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mengambil data pengguna" });
  }
};

export const getPenggunaById = async (req, res) => {
  const id = req.params.id;

  try {
    const pengguna = await penggunaModel.getPenggunaById(id);
    if (!pengguna) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }
    res.status(200).json({
      message: "Pengguna ditemukan",
      pengguna: pengguna,
    });
  } catch (err) {
    console.error("Get pengguna by ID error:", err);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mengambil data pengguna" });
  }
};
