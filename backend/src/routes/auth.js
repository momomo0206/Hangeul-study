import express from 'express';
import {
  register,
  getProfile,
  login,
  logout,
  updateProfile
} from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { validateLogin, validateProfileUpdate, validateRegister } from '../validators/auth.validator.js';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.get('/profile', requireAuth, getProfile);
router.patch('/profile', requireAuth,validateProfileUpdate, updateProfile);

export default router;