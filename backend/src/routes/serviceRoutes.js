import { Router } from 'express';
import {
  listServices,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { serviceSchema } from '../validators/schemas.js';

const router = Router();
router.get('/', listServices);
router.post('/', protect, validate(serviceSchema), createService);
router.put('/:id', protect, validate(serviceSchema.partial()), updateService);
router.delete('/:id', protect, deleteService);

export default router;
