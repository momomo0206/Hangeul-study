import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './db/connectDB.js';
import { authLimiter, generalLimiter } from './middleware/rateLimiter.js';
import authRoutes from './routes/auth.route.js';
import wordRoutes from './routes/word.route.js';

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(generalLimiter);
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`, res.statusCode, 'at', new Date());
  next();
});

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/words', wordRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // console.log(process.env.MONGO_URI);
  });
});