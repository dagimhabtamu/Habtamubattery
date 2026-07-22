import mongoose from 'mongoose';

const oldBatterySchema = new mongoose.Schema(
  {
    brand: { type: String, required: true, index: true },
    amperage: { type: Number, required: true, index: true },
    weightKg: { type: Number, required: true },
    purchasePrice: { type: Number, default: 0 },
    pricePerKg: { type: Number, default: 0 },
    condition: {
      type: String,
      enum: ['working', 'repairable', 'scrap'],
      default: 'working',
    },
    status: {
      type: String,
      enum: ['in-stock', 'maintained', 'sold'],
      default: 'in-stock',
      index: true,
    },
    acquiredFrom: { type: String },
  },
  { timestamps: true }
);

export const OldBattery = mongoose.model('OldBattery', oldBatterySchema);
