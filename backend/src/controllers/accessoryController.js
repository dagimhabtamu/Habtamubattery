import { Accessory } from '../models/Accessory.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listAccessories = asyncHandler(async (req, res) => {
  const { type, q, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (q) filter.name = new RegExp(q, 'i');

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Accessory.find(filter).sort({ name: 1 }).skip(skip).limit(Number(limit)),
    Accessory.countDocuments(filter),
  ]);
  res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
});

export const createAccessory = asyncHandler(async (req, res) => {
  const created = await Accessory.create(req.body);
  res.status(201).json(created);
});

export const updateAccessory = asyncHandler(async (req, res) => {
  const updated = await Accessory.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) {
    res.status(404);
    throw new Error('Accessory not found');
  }
  res.json(updated);
});

export const deleteAccessory = asyncHandler(async (req, res) => {
  const removed = await Accessory.findByIdAndDelete(req.params.id);
  if (!removed) {
    res.status(404);
    throw new Error('Accessory not found');
  }
  res.json({ message: 'Removed' });
});
