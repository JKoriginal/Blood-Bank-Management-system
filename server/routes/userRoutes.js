import express from 'express';
import { getAllUsers, registerUser, updateUser, deleteUser, getByUserType } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/register', registerUser);
router.patch('/update', updateUser);
router.delete('/delete', deleteUser);
router.get('/:userType', getByUserType);

export default router;
