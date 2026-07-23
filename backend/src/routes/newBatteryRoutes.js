import { Router } from 'express';
import {
  listNewBatteries,
  getNewBattery,
  createNewBattery,
  updateNewBattery,
  deleteNewBattery,
  togglePublishNewBattery,
} from '../controllers/newBatteryController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { newBatterySchema } from '../validators/schemas.js';

const router = Router();
router.get('/', listNewBatteries);
router.get('/:id', getNewBattery);
router.post('/', protect, validate(newBatterySchema), createNewBattery);
router.put('/:id', protect, validate(newBatterySchema.partial()), updateNewBattery);
router.delete('/:id', protect, deleteNewBattery);
router.patch('/:id/publish', protect, togglePublishNewBattery);

export default router;