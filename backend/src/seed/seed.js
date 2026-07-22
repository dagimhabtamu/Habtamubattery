import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';
import { NewBattery } from '../models/NewBattery.js';
import { OldBattery } from '../models/OldBattery.js';
import { Accessory } from '../models/Accessory.js';
import { AcidStock } from '../models/AcidStock.js';
import { Sale } from '../models/Sale.js';
import { Cost } from '../models/Cost.js';

dotenv.config();

const brands = ['Bosch', 'Yuasa', 'Exide', 'Clarios', 'ACDelco', 'Varta', 'Optima', 'Habtamu'];

const run = async () => {
  await connectDB();
  console.log('Clearing collections...');
  await Promise.all([
    User.deleteMany({}),
    NewBattery.deleteMany({}),
    OldBattery.deleteMany({}),
    Accessory.deleteMany({}),
    AcidStock.deleteMany({}),
    Sale.deleteMany({}),
    Cost.deleteMany({}),
  ]);

  // Admin + staff
  await User.create({
    name: 'Habtamu Admin',
    email: 'admin@habtamu.com',
    passwordHash: await User.hashPassword('admin123'),
    role: 'admin',
  });
  await User.create({
    name: 'Staff User',
    email: 'staff@habtamu.com',
    passwordHash: await User.hashPassword('staff123'),
    role: 'staff',
  });

  // New batteries (35-200 amps across brands)
  const batteries = [];
  const ampSteps = [35, 45, 55, 60, 70, 80, 90, 100, 120, 140, 150, 170, 200];
  brands.forEach((b) => {
    ampSteps.forEach((a) => {
      batteries.push({
        brand: b,
        amperage: a,
        model: `${b}-${a}Ah`,
        price: Math.round((a * 50 + 1500 + Math.random() * 1500) * 100) / 100,
        stockQuantity: Math.floor(Math.random() * 25) + 1,
        warrantyMonths: a >= 100 ? 24 : 18,
        description: `Premium ${a}Ah battery by ${b}. Reliable starting power and long service life.`,
        imageUrl: '',
      });
    });
  });
  await NewBattery.insertMany(batteries);

  // Old batteries sample (various conditions)
  await OldBattery.insertMany([
    { brand: 'Bosch', amperage: 60, weightKg: 14.5, purchasePrice: 600, pricePerKg: 85, condition: 'working', status: 'in-stock', acquiredFrom: 'Ato Bekele' },
    { brand: 'Yuasa', amperage: 70, weightKg: 16, purchasePrice: 700, pricePerKg: 90, condition: 'repairable', status: 'in-stock', acquiredFrom: 'W/ro Sara' },
    { brand: 'Exide', amperage: 100, weightKg: 21, purchasePrice: 1200, pricePerKg: 95, condition: 'working', status: 'maintained', acquiredFrom: 'Ato Dawit' },
    { brand: 'Varta', amperage: 80, weightKg: 17.5, purchasePrice: 900, pricePerKg: 88, condition: 'scrap', status: 'in-stock', acquiredFrom: 'Ato Tesfaye' },
  ]);

  // Accessories
  await Accessory.insertMany([
    { name: 'Positive Battery Terminal', type: 'terminal', polarity: 'positive', price: 45, stockQuantity: 120, unit: 'piece' },
    { name: 'Negative Battery Terminal', type: 'terminal', polarity: 'negative', price: 45, stockQuantity: 120, unit: 'piece' },
    { name: 'Battery Clamp Connector (Heavy Duty)', type: 'connector', polarity: 'both', price: 75, stockQuantity: 60, unit: 'piece' },
    { name: 'Battery Cable Wire 25mm', type: 'wire', polarity: 'n/a', price: 60, stockQuantity: 200, unit: 'meter' },
    { name: 'Battery Cable Wire 16mm', type: 'wire', polarity: 'n/a', price: 38, stockQuantity: 250, unit: 'meter' },
    { name: 'Universal Terminal Adapter', type: 'connector', polarity: 'both', price: 30, stockQuantity: 90, unit: 'piece' },
    { name: 'Anti-Corrosion Washers', type: 'other', polarity: 'n/a', price: 12, stockQuantity: 400, unit: 'piece' },
  ]);

  // Acid stock
  await AcidStock.create({ quantityLiters: 250, pricePerLiter: 90, costPerLiter: 55 });

  // Sample sale
  const nb = await NewBattery.findOne();
  if (nb) {
    await Sale.create({
      saleType: 'newBattery',
      items: [
        {
          refId: nb._id,
          refModel: 'NewBattery',
          name: `${nb.brand} ${nb.amperage}Ah`,
          quantity: 1,
          unitPrice: nb.price,
          subtotal: nb.price,
        },
      ],
      totalAmount: nb.price,
      customerName: 'Walk-in Customer',
      paymentMethod: 'cash',
    });
  }

  // Sample expenses
  await Cost.insertMany([
    { category: 'oxygenRefill', description: 'Monthly oxygen refill', amount: 1200 },
    { category: 'acidPurchase', description: '200L acid purchased', amount: 11000 },
    { category: 'accessoryRestock', description: 'Terminal restock', amount: 3500 },
  ]);

  console.log('Seed complete.');
  console.log('Admin login: admin@habtamu.com / admin123');
  console.log('Staff login: staff@habtamu.com / staff123');
  process.exit(0);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
 
