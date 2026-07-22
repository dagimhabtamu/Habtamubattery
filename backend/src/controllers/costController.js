import { Cost } from '../models/Cost.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listCosts = asyncHandler(async (req, res) => {
  const { category, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (category) filter.category = category;
  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Cost.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Cost.countDocuments(filter),
  ]);
  res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
});

export const createCost = asyncHandler(async (req, res) => {
  const created = await Cost.create(req.body);
  res.status(201).json(created);
});

export const updateCost = asyncHandler(async (req, res) => {
  const updated = await Cost.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) {
    res.status(404);
    throw new Error('Cost entry not found');
  }
  res.json(updated);
});

export const deleteCost = asyncHandler(async (req, res) => {
  const removed = await Cost.findByIdAndDelete(req.params.id);
  if (!removed) {
    res.status(404);
    throw new Error('Cost entry not found');
  }
  res.json({ message: 'Removed' });
});