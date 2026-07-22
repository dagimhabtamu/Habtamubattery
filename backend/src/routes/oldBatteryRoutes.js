import { Router } from 'express';
import {
  listOldBatteries,
  getOldBattery,
  createOldBattery,
  updateOldBattery,
  deleteOldBattery,
} from '../controllers/oldBatteryController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { oldBatterySchema } from '../validators/schemas.js';

const router = Router();
router.get('/', listOldBatteries);
router.get('/:id', getOldBattery);
router.post('/', protect, validate(oldBatterySchema), createOldBattery);
router.put('/:id', protect, validate(oldBatterySchema.partial()), updateOldBattery);
router.delete('/:id', protect, deleteOldBattery);

export default router;
