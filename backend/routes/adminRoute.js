// adminRoute.js
import express from 'express';
const router = express.Router();

// Define your admin routes here
router.get('/', (req, res) => {
  res.send('Admin Home');
});

router.get('/dashboard', (req, res) => {
  res.send('Admin Dashboard');
});

// Add more routes as needed...

// Export the router as default
export default router;
