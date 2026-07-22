import { Router } from 'express';
import {
  listCosts,
  createCost,
  updateCost,
  deleteCost,
} from '../controllers/costController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { costSchema } from '../validators/schemas.js';

const router = Router();
router.get('/', protect, listCosts);
router.post('/', protect, validate(costSchema), createCost);
router.put('/:id', protect, validate(costSchema.partial()), updateCost);
router.delete('/:id', protect, deleteCost);

export default router;
