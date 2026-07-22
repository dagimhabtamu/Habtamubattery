import { Sale } from '../models/Sale.js';
import { NewBattery } from '../models/NewBattery.js';
import { OldBattery } from '../models/OldBattery.js';
import { Accessory } from '../models/Accessory.js';
import { AcidStock } from '../models/AcidStock.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listSales = asyncHandler(async (req, res) => {
  const { saleType, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (saleType) filter.saleType = saleType;
  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Sale.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Sale.countDocuments(filter),
  ]);
  res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
});

export const getSale = asyncHandler(async (req, res) => {
  const sale = await Sale.findById(req.params.id);
  if (!sale) {
    res.status(404);
    throw new Error('Sale not found');
  }
  res.json(sale);
});

// Generic sale: deducts stock for known refIds
export const createSale = asyncHandler(async (req, res) => {
  const sale = await Sale.create(req.body);
  // Decrement stock where applicable
  for (const item of sale.items) {
    if (!item.refId) continue;
    if (item.refModel === 'NewBattery') {
      await NewBattery.findByIdAndUpdate(item.refId, { $inc: { stockQuantity: -item.quantity } });
    } else if (item.refModel === 'Accessory') {
      await Accessory.findByIdAndUpdate(item.refId, { $inc: { stockQuantity: -item.quantity } });
    } else if (item.refModel === 'AcidStock') {
      await AcidStock.findOneAndUpdate({}, { $inc: { quantityLiters: -item.quantity } });
    } else if (item.refModel === 'OldBattery') {
      await OldBattery.findByIdAndUpdate(item.refId, { status: 'sold' });
    }
  }
  res.status(201).json(sale);
});

// Trade-in: create an OldBattery record + a Sale of type tradeIn
export const createTradeIn = asyncHandler(async (req, res) => {
  const { newBatteryId, oldBatteryBrand, oldBatteryAmp, oldBatteryValue, customerName } = req.body;
  const newBattery = await NewBattery.findById(newBatteryId);
  if (!newBattery) {
    res.status(404);
    throw new Error('New battery not found');
  }
  const priceDifference = newBattery.price - Number(oldBatteryValue);

  const oldBat = await OldBattery.create({
    brand: oldBatteryBrand,
    amperage: Number(oldBatteryAmp),
    weightKg: req.body.weightKg || 0,
    purchasePrice: Number(oldBatteryValue),
    pricePerKg: req.body.pricePerKg || 0,
    condition: 'working',
    status: 'in-stock',
    acquiredFrom: customerName || 'Trade-in',
  });

  await NewBattery.findByIdAndUpdate(newBatteryId, { $inc: { stockQuantity: -1 } });

  const sale = await Sale.create({
    saleType: 'tradeIn',
    items: [
      {
        refId: newBattery._id,
        refModel: 'NewBattery',
        name: `${newBattery.brand} ${newBattery.amperage}Ah`,
        quantity: 1,
        unitPrice: priceDifference,
        subtotal: priceDifference,
      },
    ],
    tradeIn: {
      oldBatteryBrand,
      oldBatteryAmp: Number(oldBatteryAmp),
      oldBatteryValue: Number(oldBatteryValue),
      priceDifference,
    },
    totalAmount: priceDifference,
    customerName,
    paymentMethod: req.body.paymentMethod || 'cash',
  });

  res.status(201).json({ sale, oldBattery: oldBat });
});

// Buy old battery from customer (we pay them; an OldBattery record is created)
export const buyOldBattery = asyncHandler(async (req, res) => {
  const created = await OldBattery.create({ ...req.body, status: 'in-stock' });
  await Sale.create({
    saleType: 'oldBattery',
    items: [
      {
        refId: created._id,
        refModel: 'OldBattery',
        name: `${created.brand} ${created.amperage}Ah`,
        quantity: 1,
        unitPrice: -created.purchasePrice,
        subtotal: -created.purchasePrice,
      },
    ],
    totalAmount: -created.purchasePrice,
    customerName: req.body.acquiredFrom,
    paymentMethod: req.body.paymentMethod || 'cash',
  });
  res.status(201).json(created);
});

export const deleteSale = asyncHandler(async (req, res) => {
  const removed = await Sale.findByIdAndDelete(req.params.id);
  if (!removed) {
    res.status(404);
    throw new Error('Sale not found');
  }
  res.json({ message: 'Removed' });
});
