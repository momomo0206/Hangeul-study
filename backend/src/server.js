import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import expressOasGenerator from 'express-oas-generator';

import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import wordRoutes from './routes/word.js';
import translateRoutes from './routes/translate.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

expressOasGenerator.init(app, {});

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/words', wordRoutes);
app.use('/api/translate', translateRoutes);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});