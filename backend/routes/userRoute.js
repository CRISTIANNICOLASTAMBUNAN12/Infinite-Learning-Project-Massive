import express from 'express';
import userController from '../controllers/userController.js';  // Correct import

const router = express.Router();
const { addUser, getAllUsers, getUserById, updateUser, deleteUser, loginUser } = userController;

// Define CRUD operations for users
router.post('/', addUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// POST login route
router.post('/login', loginUser);  // This will handle the login request

export default router;
