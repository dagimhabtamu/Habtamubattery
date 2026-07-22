import mongoose from 'mongoose';

const newBatterySchema = new mongoose.Schema(
  {
    brand: { type: String, required: true, index: true },
    amperage: { type: Number, required: true, min: 35, max: 200, index: true },
    model: { type: String },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, default: 0 },
    warrantyMonths: { type: Number, default: 12 },
    description: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export const NewBattery = mongoose.model('NewBattery', newBatterySchema);
