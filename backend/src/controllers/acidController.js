import { AcidStock } from '../models/AcidStock.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Single document model: get current acid stock
export const getAcidStock = asyncHandler(async (_req, res) => {
  let doc = await AcidStock.findOne();
  if (!doc) doc = await AcidStock.create({});
  res.json(doc);
});

export const updateAcidStock = asyncHandler(async (req, res) => {
  let doc = await AcidStock.findOne();
  if (!doc) doc = await AcidStock.create(req.body);
  else Object.assign(doc, req.body), (await doc.save());
  res.json(doc);
});
