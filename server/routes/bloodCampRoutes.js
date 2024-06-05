import express from 'express';
import bloodCampController from '../controllers/bloodCampController.js';

const router = express.Router();

router.post('/', bloodCampController.create);
router.get('/approved', bloodCampController.getApproved);
router.get('/', bloodCampController.getAll);
router.get('/not-approved', bloodCampController.getNotApproved);
router.get('/:id', bloodCampController.getById);
router.patch('/approve/:id', bloodCampController.approve);
router.patch('/reject/:id', bloodCampController.reject);
router.delete('/delete/:id', bloodCampController.delete);

export default router;
