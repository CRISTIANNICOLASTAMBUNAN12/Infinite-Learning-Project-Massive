import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(403).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }

    req.user = decoded; // Attach decoded data to request object
    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    res.status(500).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default authAdmin;
