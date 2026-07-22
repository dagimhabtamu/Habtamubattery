import mongoose from 'mongoose';

const accessorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['connector', 'wire', 'terminal', 'other'],
      required: true,
    },
    polarity: {
      type: String,
      enum: ['positive', 'negative', 'both', 'n/a'],
      default: 'n/a',
    },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, default: 0 },
    unit: { type: String, default: 'piece' },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export const Accessory = mongoose.model('Accessory', accessorySchema);
