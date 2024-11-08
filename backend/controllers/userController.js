import bcrypt from 'bcrypt';
import validator from 'validator';
import userModel from '../models/userModel.js';  // Model untuk akses data user
import jwt from 'jsonwebtoken';  // Pastikan ini diimpor

// Fungsi untuk menambahkan User baru
const addUser = async (req, res) => {
  const { nama, email, password, pengalaman, tentang, alamat, jenis_kelamin, pekerjaan, nohp } = req.body;

  // Validasi data wajib
  if (!nama || !email || !password || !pengalaman || !tentang || !alamat) {
    return res.status(400).json({ success: false, message: 'Beberapa data wajib tidak lengkap' });
  }

  // Validasi format email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: 'Format email tidak valid' });
  }

  // Validasi panjang password
  if (password.length < 8) {
    return res.status(400).json({ success: false, message: 'Password harus memiliki minimal 8 karakter' });
  }

  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Data user
    const dataUser = {
      nama,
      email,
      password: hashedPassword,
      pengalaman,
      tentang,
      alamat, // Pastikan ini adalah string yang valid
      jenis_kelamin: jenis_kelamin || 'Tidak Dipilih',
      pekerjaan: pekerjaan || 'Tidak Dipilih',
      nohp: nohp || '000000000000',
    };

    // Menambahkan User ke database
    await userModel.addUser(dataUser);
    res.status(201).json({ success: true, message: 'User berhasil ditambahkan' });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan di server, coba lagi nanti' });
  }
};

// Fungsi untuk mendapatkan semua User
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();  // Panggil fungsi yang sudah dipromosikan
    res.status(200).json(users);  // Mengirimkan hasil query
  } catch (error) {
    console.error('Error in getAllUsers controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fungsi untuk mendapatkan User berdasarkan ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.getUserById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan di server, coba lagi nanti' });
  }
};

// Fungsi untuk memperbarui data User
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, email, password, pengalaman, tentang, alamat, jenis_kelamin, pekerjaan, nohp } = req.body;

    // Validasi data yang wajib
    if (!nama || !email || !password || !pengalaman || !tentang || !alamat) {
      return res.status(400).json({ success: false, message: 'Beberapa data wajib tidak lengkap' });
    }

    // Hash password baru
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const dataUser = {
      nama,
      email,
      password: hashedPassword,
      pengalaman,
      tentang,
      alamat, // Pastikan alamat tetap string, tanpa parsing
      jenis_kelamin: jenis_kelamin || 'Tidak Dipilih',
      pekerjaan: pekerjaan || 'Tidak Dipilih',
      nohp: nohp || '000000000000',
    };

    // Memperbarui data User berdasarkan ID
    await userModel.updateUser(id, dataUser);
    res.status(200).json({ success: true, message: 'Data User berhasil diperbarui' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan di server, coba lagi nanti' });
  }
};

// Fungsi untuk menghapus User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Menghapus User berdasarkan ID
    await userModel.deleteUser(id);
    res.status(200).json({ success: true, message: 'User berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan di server, coba lagi nanti' });
  }
};

// Fungsi untuk login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Find the user by email
    const user = await userModel.getUserByEmail(email);  // Adjust this based on your model
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Incorrect password' });
    }

    // Generate JWT token
    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token as a response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,  // Return the JWT token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export default { addUser, getAllUsers, getUserById, updateUser, deleteUser, loginUser };
