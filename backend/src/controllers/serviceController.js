import { Service } from '../models/Service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listServices = asyncHandler(async (req, res) => {
  const { type, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (type) filter.type = type;
  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Service.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Service.countDocuments(filter),
  ]);
  res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
});

export const createService = asyncHandler(async (req, res) => {
  const created = await Service.create(req.body);
  res.status(201).json(created);
});

export const updateService = asyncHandler(async (req, res) => {
  const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) {
    res.status(404);
    throw new Error('Service not found');
  }
  res.json(updated);
});

export const deleteService = asyncHandler(async (req, res) => {
  const removed = await Service.findByIdAndDelete(req.params.id);
  if (!removed) {
    res.status(404);
    throw new Error('Service not found');
  }
  res.json({ message: 'Removed' });
});
