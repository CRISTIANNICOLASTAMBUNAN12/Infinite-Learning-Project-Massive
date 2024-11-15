// penggunaController.js
import bcrypt from "bcrypt";
import * as penggunaModel from "../models/penggunaModel.js";
import jwt from "jsonwebtoken";

export const addPengguna = async (req, res) => {
  try {
    const {
      nama,
      email,
      kata_sandi,
      pengalaman,
      tentang,
      alamat,
      jenis_kelamin,
      pekerjaan,
      no_hp,
      peran,
    } = req.body;

    if (!nama || !email || !kata_sandi || !pengalaman || !tentang || !alamat) {
      return res
        .status(400)
        .json({ success: false, message: "Data tidak lengkap" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedKataSandi = await bcrypt.hash(kata_sandi, salt);

    const penggunaData = {
      nama,
      email,
      pengalaman,
      tentang,
      alamat,
      jenis_kelamin,
      pekerjaan,
      no_hp,
      kata_sandi: hashedKataSandi,
      peran: peran || "petani",
    };

    await penggunaModel.addPengguna(penggunaData);
    res
      .status(201)
      .json({ success: true, message: "Pengguna berhasil ditambahkan" });
  } catch (error) {
    console.error("Error adding pengguna:", error);
    res
      .status(500)
      .json({ success: false, message: "Gagal menambahkan pengguna", error });
  }
};

// READ
export const getAllPengguna = async (req, res) => {
  try {
    const pengguna = await penggunaModel.getAllPengguna();
    res.status(200).json({ success: true, data: pengguna });
  } catch (error) {
    console.error("Error fetching pengguna:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mendapatkan data pengguna",
      error,
    });
  }
};

export const getPenggunaById = async (req, res) => {
  try {
    const { id } = req.params;
    const pengguna = await penggunaModel.getPenggunaById(id);
    if (!pengguna)
      return res
        .status(404)
        .json({ success: false, message: "Pengguna tidak ditemukan" });
    res.status(200).json({ success: true, data: pengguna });
  } catch (error) {
    console.error("Error fetching pengguna by id:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mendapatkan data pengguna",
      error,
    });
  }
};

// UPDATE
// UPDATE
export const updatePengguna = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nama,
      email,
      kata_sandi,
      pengalaman,
      tentang,
      alamat,
      jenis_kelamin,
      pekerjaan,
      no_hp,
      peran,
    } = req.body;

    // Periksa apakah ada data yang tidak ada atau undefined
    if (!nama || !email || !kata_sandi || !pengalaman || !tentang || !alamat) {
      return res
        .status(400)
        .json({ success: false, message: "Data tidak lengkap" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedKataSandi = await bcrypt.hash(kata_sandi, salt);

    const penggunaData = {
      nama,
      email,
      pengalaman,
      tentang,
      alamat,
      jenis_kelamin: jenis_kelamin || null, // Jika tidak ada, set null
      pekerjaan: pekerjaan || null, // Jika tidak ada, set null
      no_hp: no_hp || null, // Jika tidak ada, set null
      kata_sandi: hashedKataSandi,
      peran: peran || null, // Jika tidak ada, set null
    };

    await penggunaModel.updatePengguna(id, penggunaData);
    res
      .status(200)
      .json({ success: true, message: "Pengguna berhasil diperbarui" });
  } catch (error) {
    console.error("Error updating pengguna:", error);
    res
      .status(500)
      .json({ success: false, message: "Gagal memperbarui pengguna", error });
  }
};

// DELETE
export const deletePengguna = async (req, res) => {
  try {
    const { id } = req.params;

    // Periksa apakah ID valid
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "ID pengguna tidak valid" });
    }

    // Periksa apakah pengguna dengan ID tersebut ada
    const pengguna = await penggunaModel.getPenggunaById(id);
    if (!pengguna) {
      return res
        .status(404)
        .json({ success: false, message: "Pengguna tidak ditemukan" });
    }

    // Pastikan hanya admin yang dapat menghapus pengguna
    const userRole = req.user?.peran;
    if (userRole !== "admin") {
      return res
        .status(403)
        .json({
          success: false,
          message: "Akses ditolak, hanya admin yang bisa menghapus",
        });
    }

    // Hapus pengguna
    await penggunaModel.deletePengguna(id);
    res
      .status(200)
      .json({ success: true, message: "Pengguna berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting pengguna:", error);
    res
      .status(500)
      .json({ success: false, message: "Gagal menghapus pengguna", error });
  }
};

export const loginPengguna = async (req, res) => {
  const { email, kata_sandi } = req.body;
  const pengguna = await penggunaModel.getPenggunaByEmail(email);

  if (!pengguna)
    return res
      .status(404)
      .json({ success: false, message: "Pengguna tidak ditemukan" });

  const isMatch = await bcrypt.compare(kata_sandi, pengguna.kata_sandi);
  if (!isMatch)
    return res
      .status(400)
      .json({ success: false, message: "Kata sandi salah" });

  const payload = {
    id: pengguna.id,
    email: pengguna.email,
    role: pengguna.peran,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET || "secretKey", {
    expiresIn: "1h",
  });

  res.status(200).json({
    success: true,
    message: "Login berhasil",
    token,
  });
};