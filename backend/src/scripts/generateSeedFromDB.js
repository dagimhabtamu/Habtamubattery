import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import { User }       from '../models/User.js';
import { NewBattery } from '../models/NewBattery.js';
import { OldBattery } from '../models/OldBattery.js';
import { Accessory }  from '../models/Accessory.js';
import { Sale }       from '../models/Sale.js';
import { Cost }       from '../models/Cost.js';
import { AcidStock }  from '../models/AcidStock.js';

dotenv.config();

const LOCAL_URI = process.env.MONGO_URI;

const DEFAULT_PASSWORDS = {
  'admin@habtamu.com': 'admin123',
  'staff@habtamu.com': 'staff123',
};

async function generate() {
  if (!LOCAL_URI || !LOCAL_URI.includes('mongodb+srv')) {
    console.error('ERROR: MONGO_URI in backend/.env must be your Atlas connection string.');
    process.exit(1);
  }
  console.log('Connecting to local MongoDB...');
  await mongoose.connect(LOCAL_URI);

  const [users, newBats, oldBats, accs, sales, costs, acid] = await Promise.all([
    User.find().lean(),
    NewBattery.find().lean(),
    OldBattery.find().lean(),
    Accessory.find().lean(),
    Sale.find().lean(),
    Cost.find().lean(),
    AcidStock.find().lean(),
  ]);

  console.log('Found:');
  console.log('  User:        ' + users.length);
  console.log('  NewBattery:  ' + newBats.length);
  console.log('  OldBattery:  ' + oldBats.length);
  console.log('  Accessory:   ' + accs.length);
  console.log('  Sale:        ' + sales.length);
  console.log('  Cost:        ' + costs.length);
  console.log('  AcidStock:   ' + acid.length);

  // Strip fields Mongoose should regenerate
  const clean = ({ _id, __v, createdAt, updatedAt, passwordHash, ...rest }) => rest;
  const stripHash = ({ _id, __v, createdAt, updatedAt, passwordHash, ...rest }) => ({
    ...rest,
    _plainPassword: DEFAULT_PASSWORDS[rest.email] || 'changeme',
  });

  const seedContent = `import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { User }       from '../models/User.js';
import { NewBattery } from '../models/NewBattery.js';
import { OldBattery } from '../models/OldBattery.js';
import { Accessory }  from '../models/Accessory.js';
import { AcidStock }  from '../models/AcidStock.js';
import { Sale }       from '../models/Sale.js';
import { Cost }       from '../models/Cost.js';

dotenv.config();

const DEFAULT_PASSWORDS = {
  'admin@habtamu.com': 'admin123',
  'staff@habtamu.com': 'staff123',
};

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

  // Users
  const usersData = ` + JSON.stringify(users.map(stripHash), null, 2) + `;
  for (const u of usersData) {
    const plain = u._plainPassword || DEFAULT_PASSWORDS[u.email] || 'changeme';
    const { _plainPassword, ...userData } = u;
    await User.create({
      ...userData,
      passwordHash: await User.hashPassword(plain),
    });
  }
  console.log('  User: ' + usersData.length + ' items');

  // New Batteries
  if (` + newBats.length + ` > 0) {
    await NewBattery.insertMany(` + JSON.stringify(newBats.map(clean), null, 2) + `);
    console.log('  NewBattery: ' + ` + newBats.length + ` + ' items');
  }

  // Old Batteries
  if (` + oldBats.length + ` > 0) {
    await OldBattery.insertMany(` + JSON.stringify(oldBats.map(clean), null, 2) + `);
    console.log('  OldBattery: ' + ` + oldBats.length + ` + ' items');
  }

  // Accessories
  if (` + accs.length + ` > 0) {
    await Accessory.insertMany(` + JSON.stringify(accs.map(clean), null, 2) + `);
    console.log('  Accessory: ' + ` + accs.length + ` + ' items');
  }

  // Acid Stock
  if (` + acid.length + ` > 0) {
    await AcidStock.insertMany(` + JSON.stringify(acid.map(clean), null, 2) + `);
    console.log('  AcidStock: ' + ` + acid.length + ` + ' items');
  }

  // Sales
  if (` + sales.length + ` > 0) {
    await Sale.insertMany(` + JSON.stringify(sales.map(clean), null, 2) + `);
    console.log('  Sale: ' + ` + sales.length + ` + ' items');
  }

  // Costs
  if (` + costs.length + ` > 0) {
    await Cost.insertMany(` + JSON.stringify(costs.map(clean), null, 2) + `);
    console.log('  Cost: ' + ` + costs.length + ` + ' items');
  }

  console.log('');
  console.log('Seed complete!');
  console.log('Admin login: admin@habtamu.com / admin123');
  console.log('Staff login: staff@habtamu.com / staff123');
  process.exit(0);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
`;

  fs.writeFileSync('src/seed/seed.js', seedContent);
  console.log('');
  console.log('Updated: src/seed/seed.js');
  console.log('Next time you run "npm run seed", it will create this exact data.');
  await mongoose.disconnect();
  process.exit(0);
}

generate().catch((e) => {
  console.error('Error:', e.message);
  process.exit(1);
});