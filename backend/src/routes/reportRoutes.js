import { Router } from 'express';
import { getIncomeReport, getDashboardSummary } from '../controllers/reportController.js';
import { protect } from '../middleware/auth.js';

const router = Router();
router.get('/income', protect, getIncomeReport);
router.get('/summary', protect, getDashboardSummary);

export default router;
