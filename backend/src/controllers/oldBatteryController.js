import { OldBattery } from '../models/OldBattery.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listOldBatteries = asyncHandler(async (req, res) => {
  const { brand, amperage, status, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (brand) filter.brand = brand;
  if (amperage) filter.amperage = Number(amperage);
  if (status) filter.status = status;

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    OldBattery.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    OldBattery.countDocuments(filter),
  ]);
  res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
});

export const getOldBattery = asyncHandler(async (req, res) => {
  const item = await OldBattery.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Old battery not found');
  }
  res.json(item);
});

export const createOldBattery = asyncHandler(async (req, res) => {
  const created = await OldBattery.create(req.body);
  res.status(201).json(created);
});

export const updateOldBattery = asyncHandler(async (req, res) => {
  const updated = await OldBattery.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) {
    res.status(404);
    throw new Error('Old battery not found');
  }
  res.json(updated);
});

export const deleteOldBattery = asyncHandler(async (req, res) => {
  const removed = await OldBattery.findByIdAndDelete(req.params.id);
  if (!removed) {
    res.status(404);
    throw new Error('Old battery not found');
  }
  res.json({ message: 'Removed' });
});
