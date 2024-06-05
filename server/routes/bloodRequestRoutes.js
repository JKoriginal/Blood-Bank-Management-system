import express from 'express';
import bloodRequestController from '../controllers/bloodRequestController.js';

const router = express.Router();

router.post('/', bloodRequestController.create);
router.get('/', bloodRequestController.getAll);
router.get('/:nationalIDNumber', bloodRequestController.getById);
router.patch('/:nationalIDNumber', bloodRequestController.update);
router.patch('/approve/:nationalIDNumber', bloodRequestController.approve);
router.patch('/reject/:nationalIDNumber', bloodRequestController.reject);
router.delete('/delete/:nationalIDNumber', bloodRequestController.delete); // Corrected typo in parameter name

export default router;
