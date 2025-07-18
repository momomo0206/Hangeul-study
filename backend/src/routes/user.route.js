import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getProfile } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/profile', protect, getProfile);

export default router;