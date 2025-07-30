import express from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import { translateJapaneseToKorean } from '../controllers/translate.controller.js';
import { validateTranslate } from '../validators/translate.validator.js';

const router = express.Router();

router.post('/', requireAuth, validateTranslate, translateJapaneseToKorean);

export default router;