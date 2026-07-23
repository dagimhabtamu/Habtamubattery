// One-time migration: publish all existing batteries so they stay visible on the public site.
// Run: node src/scripts/publishAllBatteries.js
import mongoose from 'mongoose';
import { NewBattery } from '../models/NewBattery.js';
import { connectDB } from '../config/db.js';

(async () => {
  try {
    await connectDB();
    const result = await NewBattery.updateMany(
      { published: { $exists: false } },
      { $set: { published: true } }
    );
    console.log('Migration done. Updated ' + result.modifiedCount + ' existing batteries to published=true.');
    process.exit(0);
  } catch (e) {
    console.error('Migration failed:', e.message);
    process.exit(1);
  }
})();