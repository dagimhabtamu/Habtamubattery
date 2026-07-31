import { Router } from 'express';
import {
  listContactMessages,
  getContactMessage,
  createContactMessage,
  markRead,
  deleteContactMessage,
} from '../controllers/contactMessageController.js';
import { protect } from '../middleware/auth.js';

const router = Router();
router.post('/',        createContactMessage);     // public - visitors can submit
router.get('/',         protect, listContactMessages);
router.get('/:id',      protect, getContactMessage);
router.patch('/:id/read', protect, markRead);
router.delete('/:id',   protect, deleteContactMessage);

export default router;