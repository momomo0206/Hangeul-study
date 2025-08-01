/**
 * @swagger
 * tags:
 *   - name: Translate
 *     description: 翻訳API
 */

import express from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import { translateJapaneseToKorean } from '../controllers/translate.controller.js';
import { validateTranslate } from '../validators/translate.validator.js';

const router = express.Router();

/**
 * @swagger
 * /api/translate:
 *   post:
 *     summary: 日本語→韓国語変換
 *     tags: [Translate]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: こんにちは
 *     responses:
 *       200:
 *         description: 翻訳結果
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 japanese:
 *                   type: string
 *                   example: こんにちは
 *                 korean:
 *                   type: string
 *                   example: 안녕하세요
 *                 reading:
 *                   type: string
 *                   example: アンニョンハセヨ
 *                 audioUrl:
 *                   type: string
 *                   example: https://example.com/tts.mp3
 *       400:
 *         description: バリデーションエラー
 *       401:
 *         description: 未認証
 */
router.post('/', requireAuth, validateTranslate, translateJapaneseToKorean);

export default router;