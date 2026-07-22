import mongoose from 'mongoose';

const costSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: [
        'oxygenRefill',
        'acidPurchase',
        'accessoryRestock',
        'batteryPurchase',
        'other',
      ],
      required: true,
    },
    description: { type: String },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Cost = mongoose.model('Cost', costSchema);
