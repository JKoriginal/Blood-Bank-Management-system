import express from 'express'
import {createBloodStockEntry,getAllBloodStockEntries,getBloodStockEntryByBloodType,updateBloodStockEntry,deleteBloodStockEntry} from '../controllers/bloodStockController.js';

const router = express.Router();

router.post('/',createBloodStockEntry);
router.get('/', getAllBloodStockEntries);
router.get('/:bloodType', getBloodStockEntryByBloodType);
router.patch('/:bloodType', updateBloodStockEntry);
router.delete('/:bloodType', deleteBloodStockEntry);

export default router;
