import { Router } from 'express';
import { login, register, me } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { loginSchema } from '../validators/schemas.js';

const router = Router();
router.post('/login', validate(loginSchema), login);
router.post('/register', validate(loginSchema.partial({ name: true })), register);
router.get('/me', protect, me);

export default router;
