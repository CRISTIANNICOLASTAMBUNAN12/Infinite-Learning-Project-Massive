const jwt = require('jsonwebtoken');

// Middleware untuk verifikasi JWT
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ success: false, message: 'Akses ditolak, token tidak ditemukan' });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, 'secretKey');  // Gunakan secretKey yang sama
    req.user = decoded;  // Menyimpan data pengguna yang terdekripsi di req.user
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false, message: 'Token tidak valid atau sudah kedaluwarsa' });
  }
};

// Middleware untuk memeriksa role pengguna
const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.role_id !== requiredRole) {
      return res.status(403).json({ success: false, message: 'Akses ditolak, peran tidak sesuai' });
    }
    next();
  };
};

module.exports = { verifyToken, checkRole };
