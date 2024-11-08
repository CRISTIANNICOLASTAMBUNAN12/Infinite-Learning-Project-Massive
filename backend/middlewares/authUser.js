const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('./models/userModel'); 

// Fungsi login yang menghasilkan JWT
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari user berdasarkan email
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verifikasi password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Incorrect password' });
    }

    // Buat payload JWT, bisa menambahkan role_id dan informasi penting lainnya
    const payload = {
      id: user.id,
      email: user.email,
      role_id: user.role_id,
    };

    // Buat token dengan secret key, misalnya 'secretKey', dan set waktu kedaluwarsa token
    const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });

    // Kirimkan token ke client
    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan di server' });
  }
};
