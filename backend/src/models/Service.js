import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['acidChange', 'terminalFix', 'repair', 'oxygenRefill', 'other'],
      required: true,
    },
    description: { type: String },
    price: { type: Number, default: 0 },
    cost: { type: Number, default: 0 },
    relatedBatteryId: { type: mongoose.Schema.Types.ObjectId, ref: 'OldBattery' },
    customerName: { type: String },
  },
  { timestamps: true }
);

export const Service = mongoose.model('Service', serviceSchema);
