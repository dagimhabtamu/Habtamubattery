import { Router } from 'express';
import {
  listAccessories,
  createAccessory,
  updateAccessory,
  deleteAccessory,
} from '../controllers/accessoryController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { accessorySchema } from '../validators/schemas.js';

const router = Router();
router.get('/', listAccessories);
router.post('/', protect, validate(accessorySchema), createAccessory);
router.put('/:id', protect, validate(accessorySchema.partial()), updateAccessory);
router.delete('/:id', protect, deleteAccessory);

export default router;
