import { ContactMessage } from '../models/ContactMessage.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listContactMessages = asyncHandler(async (req, res) => {
  const { read, archived, page = 1, limit = 50 } = req.query;
  const filter = {};
  if (read === 'true') filter.read = true;
  if (read === 'false') filter.read = false;
  if (archived === 'true') filter.archived = true;

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total, unread] = await Promise.all([
    ContactMessage.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    ContactMessage.countDocuments(filter),
    ContactMessage.countDocuments({ read: false, archived: false }),
  ]);
  res.json({ items, total, unread, page: Number(page), pages: Math.ceil(total / limit) });
});

export const getContactMessage = asyncHandler(async (req, res) => {
  const msg = await ContactMessage.findById(req.params.id);
  if (!msg) { res.status(404); throw new Error('Message not found'); }
  res.json(msg);
});

export const createContactMessage = asyncHandler(async (req, res) => {
  const created = await ContactMessage.create(req.body);
  res.status(201).json(created);
});

export const markRead = asyncHandler(async (req, res) => {
  const msg = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { read: !!req.body.read },
    { new: true }
  );
  if (!msg) { res.status(404); throw new Error('Message not found'); }
  res.json(msg);
});

export const deleteContactMessage = asyncHandler(async (req, res) => {
  const removed = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!removed) { res.status(404); throw new Error('Message not found'); }
  res.json({ message: 'Removed' });
});