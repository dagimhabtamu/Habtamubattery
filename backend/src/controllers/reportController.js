import { Sale } from '../models/Sale.js';
import { Cost } from '../models/Cost.js';
import { OldBattery } from '../models/OldBattery.js';
import { NewBattery } from '../models/NewBattery.js';
import { Accessory } from '../models/Accessory.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Build a date filter based on a preset (daily, weekly, monthly, custom)
const buildDateFilter = (req) => {
  const { period = 'all', from, to } = req.query;
  const now = new Date();
  let start;
  if (period === 'daily') {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else if (period === 'weekly') {
    start = new Date(now);
    start.setDate(now.getDate() - 7);
  } else if (period === 'monthly') {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
  } else if (period === 'custom' && from && to) {
    start = new Date(from);
    const end = new Date(to);
    return { $gte: start, $lte: end };
  } else {
    return null;
  }
  return { $gte: start, $lte: now };
};

export const getIncomeReport = asyncHandler(async (req, res) => {
  const dateFilter = buildDateFilter(req);
  const saleMatch = dateFilter ? { createdAt: dateFilter } : {};
  const costMatch = dateFilter ? { createdAt: dateFilter } : {};

  const [sales, costs, oldBats, newBats, accessories] = await Promise.all([
    Sale.find(saleMatch).lean(),
    Cost.find(costMatch).lean(),
    OldBattery.find({ status: { $ne: 'sold' } }).lean(),
    NewBattery.find().lean(),
    Accessory.find().lean(),
  ]);

  // Revenue breakdown by saleType
  const byType = {
    newBattery: 0,
    oldBattery: 0,
    accessory: 0,
    acid: 0,
    service: 0,
    tradeIn: 0,
  };

  sales.forEach((s) => {
    byType[s.saleType] = (byType[s.saleType] || 0) + (s.totalAmount || 0);
  });

  // Old battery resale potential (kg * pricePerKg) for those in-stock
  const oldBatteryResaleValue = oldBats.reduce(
    (acc, b) => acc + (b.weightKg || 0) * (b.pricePerKg || 0),
    0
  );

  const totalRevenue = Object.values(byType).reduce((a, b) => a + b, 0);
  const totalCosts = costs.reduce((acc, c) => acc + (c.amount || 0), 0);
  const netProfit = totalRevenue - totalCosts;

  // Inventory valuation
  const newBatteryValue = newBats.reduce(
    (a, b) => a + (b.price || 0) * (b.stockQuantity || 0),
    0
  );
  const accessoryValue = accessories.reduce(
    (a, b) => a + (b.price || 0) * (b.stockQuantity || 0),
    0
  );

  // Category profit breakdown
  const costsByCategory = {};
  costs.forEach((c) => {
    costsByCategory[c.category] = (costsByCategory[c.category] || 0) + c.amount;
  });

  res.json({
    period: req.query.period || 'all',
    dateRange: dateFilter,
    breakdown: byType,
    totals: {
      totalRevenue,
      totalCosts,
      netProfit,
      oldBatteryResaleValue,
      newBatteryInventoryValue: newBatteryValue,
      accessoryInventoryValue: accessoryValue,
    },
    costsByCategory,
    counts: {
      sales: sales.length,
      costs: costs.length,
      newBatteries: newBats.length,
      oldBatteries: oldBats.length,
      accessories: accessories.length,
    },
  });
});

export const getDashboardSummary = asyncHandler(async (_req, res) => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [todaySales, monthSales, newBats, accessories, services] = await Promise.all([
    Sale.find({ createdAt: { $gte: startOfDay } }).lean(),
    Sale.find({ createdAt: { $gte: startOfMonth } }).lean(),
    NewBattery.find().lean(),
    Accessory.find().lean(),
    Sale.find({ saleType: 'service' }).lean(),
  ]);

  const sum = (arr, key) => arr.reduce((a, b) => a + (b[key] || 0), 0);

  const lowStock = [
    ...newBats
      .filter((b) => (b.stockQuantity || 0) <= 5)
      .map((b) => ({ ...b, kind: 'NewBattery' })),
    ...accessories
      .filter((a) => (a.stockQuantity || 0) <= 5)
      .map((a) => ({ ...a, kind: 'Accessory' })),
  ];

  res.json({
    todayRevenue: sum(todaySales, 'totalAmount'),
    monthlyRevenue: sum(monthSales, 'totalAmount'),
    totalNewBatteryUnits: sum(newBats, 'stockQuantity'),
    totalAccessoryUnits: sum(accessories, 'stockQuantity'),
    pendingServices: services.length,
    lowStock,
  });
});
