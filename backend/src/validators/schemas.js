import { z } from 'zod';

export const newBatterySchema = z.object({
  brand: z.string().min(1),
  amperage: z.number().int().min(35).max(200),
  model: z.string().optional(),
  price: z.number().positive(),
  stockQuantity: z.number().int().nonnegative(),
  warrantyMonths: z.number().int().nonnegative().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
});

export const oldBatterySchema = z.object({
  brand: z.string().min(1),
  amperage: z.number().int().positive(),
  weightKg: z.number().positive(),
  purchasePrice: z.number().nonnegative(),
  pricePerKg: z.number().nonnegative(),
  condition: z.enum(['working', 'repairable', 'scrap']).default('working'),
  status: z.enum(['in-stock', 'maintained', 'sold']).default('in-stock'),
  acquiredFrom: z.string().optional(),
});

export const accessorySchema = z.object({
  name: z.string().min(1),
  type: z.enum(['connector', 'wire', 'terminal', 'other']),
  polarity: z.enum(['positive', 'negative', 'both', 'n/a']).default('n/a'),
  price: z.number().positive(),
  stockQuantity: z.number().int().nonnegative(),
  unit: z.string().default('piece'),
  imageUrl: z.string().optional(),
});

export const acidSchema = z.object({
  quantityLiters: z.number().nonnegative(),
  pricePerLiter: z.number().nonnegative(),
  costPerLiter: z.number().nonnegative(),
});

export const serviceSchema = z.object({
  type: z.enum(['acidChange', 'terminalFix', 'repair', 'oxygenRefill', 'other']),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  cost: z.number().nonnegative(),
  relatedBatteryId: z.string().optional(),
  customerName: z.string().optional(),
});

export const saleSchema = z.object({
  saleType: z.enum(['newBattery', 'oldBattery', 'accessory', 'acid', 'service', 'tradeIn']),
  items: z
    .array(
      z.object({
        refId: z.string().optional(),
        refModel: z.string().optional(),
        name: z.string(),
        quantity: z.number().positive(),
        unitPrice: z.number().nonnegative(),
        subtotal: z.number().nonnegative(),
      })
    )
    .min(1),
  tradeIn: z
    .object({
      oldBatteryBrand: z.string(),
      oldBatteryAmp: z.number(),
      oldBatteryValue: z.number().nonnegative(),
      priceDifference: z.number(),
    })
    .optional(),
  totalAmount: z.number().nonnegative(),
  customerName: z.string().optional(),
  paymentMethod: z.string().optional(),
});

export const costSchema = z.object({
  category: z.enum([
    'oxygenRefill',
    'acidPurchase',
    'accessoryRestock',
    'batteryPurchase',
    'other',
  ]),
  description: z.string().optional(),
  amount: z.number().positive(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
