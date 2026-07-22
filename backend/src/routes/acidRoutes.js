import { Router } from 'express';
import { getAcidStock, updateAcidStock } from '../controllers/acidController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { acidSchema } from '../validators/schemas.js';

const router = Router();
router.get('/', getAcidStock);
router.put('/', protect, validate(acidSchema.partial()), updateAcidStock);

export default router;
