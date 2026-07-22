import { Router } from 'express';
import {
  listSales,
  getSale,
  createSale,
  createTradeIn,
  buyOldBattery,
  deleteSale,
} from '../controllers/saleController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { saleSchema } from '../validators/schemas.js';

const router = Router();
router.get('/', protect, listSales);
router.get('/:id', protect, getSale);
router.post('/', protect, validate(saleSchema), createSale);
router.post('/trade-in', protect, createTradeIn);
router.post('/buy-old', protect, buyOldBattery);
router.delete('/:id', protect, deleteSale);

export default router;
