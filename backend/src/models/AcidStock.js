import mongoose from 'mongoose';

const acidStockSchema = new mongoose.Schema(
  {
    quantityLiters: { type: Number, default: 0 },
    pricePerLiter: { type: Number, default: 0 },
    costPerLiter: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const AcidStock = mongoose.model('AcidStock', acidStockSchema);
