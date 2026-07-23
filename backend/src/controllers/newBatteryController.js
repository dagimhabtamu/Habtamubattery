import { NewBattery } from '../models/NewBattery.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listNewBatteries = asyncHandler(async (req, res) => {
  const { brand, minAmp, maxAmp, q, page = 1, limit = 20, all } = req.query;
  const filter = {};
  // Public API hides drafts. Admin passes ?all=1 to see everything.
  if (!all) filter.published = true;

  if (brand) filter.brand = brand;
  if (minAmp || maxAmp) {
    filter.amperage = {};
    if (minAmp) filter.amperage.$gte = Number(minAmp);
    if (maxAmp) filter.amperage.$lte = Number(maxAmp);
  }
  if (q) filter.brand = new RegExp(q, 'i');

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    NewBattery.find(filter).sort({ brand: 1, amperage: 1 }).skip(skip).limit(Number(limit)),
    NewBattery.countDocuments(filter),
  ]);
  res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
});

export const getNewBattery = asyncHandler(async (req, res) => {
  const item = await NewBattery.findById(req.params.id);
  if (!item) { res.status(404); throw new Error('Battery not found'); }
  res.json(item);
});

export const createNewBattery = asyncHandler(async (req, res) => {
  const created = await NewBattery.create(req.body);
  res.status(201).json(created);
});

export const updateNewBattery = asyncHandler(async (req, res) => {
  const updated = await NewBattery.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) { res.status(404); throw new Error('Battery not found'); }
  res.json(updated);
});

export const deleteNewBattery = asyncHandler(async (req, res) => {
  const removed = await NewBattery.findByIdAndDelete(req.params.id);
  if (!removed) { res.status(404); throw new Error('Battery not found'); }
  res.json({ message: 'Removed' });
});

// Toggle publish state
export const togglePublishNewBattery = asyncHandler(async (req, res) => {
  const item = await NewBattery.findById(req.params.id);
  if (!item) { res.status(404); throw new Error('Battery not found'); }
  item.published = !item.published;
  await item.save();
  res.json(item);
});