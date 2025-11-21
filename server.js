import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
import cpuRouter from './routes/cpu.js';
import gpuRouter from './routes/gpu.js';
import ramRouter from './routes/ram.js';
import ssdRouter from './routes/ssd.js';
import hddRouter from './routes/hdd.js';
import usbRouter from './routes/usb.js';

app.use('/api/cpu', cpuRouter);
app.use('/api/gpu', gpuRouter);
app.use('/api/ram', ramRouter);
app.use('/api/ssd', ssdRouter);
app.use('/api/hdd', hddRouter);
app.use('/api/usb', usbRouter);

// Health Check
app.get('/', (req, res) => {
  res.json({ message: 'Computer Hardware Performance API - Running!', timestamp: new Date().toISOString() });
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});