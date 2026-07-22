import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    refId: { type: mongoose.Schema.Types.ObjectId },
    refModel: { type: String },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    subtotal: { type: Number, required: true },
  },
  { _id: false }
);

const saleSchema = new mongoose.Schema(
  {
    saleType: {
      type: String,
      enum: ['newBattery', 'oldBattery', 'accessory', 'acid', 'service', 'tradeIn'],
      required: true,
    },
    items: { type: [itemSchema], required: true },
    tradeIn: {
      oldBatteryBrand: String,
      oldBatteryAmp: Number,
      oldBatteryValue: Number,
      priceDifference: Number,
    },
    totalAmount: { type: Number, required: true },
    customerName: { type: String },
    paymentMethod: { type: String, default: 'cash' },
  },
  { timestamps: true }
);

saleSchema.index({ createdAt: -1 });

export const Sale = mongoose.model('Sale', saleSchema);
