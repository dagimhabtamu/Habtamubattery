import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import newBatteryRoutes from './routes/newBatteryRoutes.js';
import oldBatteryRoutes from './routes/oldBatteryRoutes.js';
import accessoryRoutes from './routes/accessoryRoutes.js';
import acidRoutes from './routes/acidRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import saleRoutes from './routes/saleRoutes.js';
import costRoutes from './routes/costRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => res.json({ ok: true, name: 'Habtamu Batteries API' }));

app.use('/api/auth', authRoutes);
app.use('/api/new-batteries', newBatteryRoutes);
app.use('/api/old-batteries', oldBatteryRoutes);
app.use('/api/accessories', accessoryRoutes);
app.use('/api/acid', acidRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/costs', costRoutes);
app.use('/api/reports', reportRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`API running on port ${PORT}`));
});
