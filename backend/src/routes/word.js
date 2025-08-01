/**
 * @swagger
 * tags:
 *   - name: Words
 *     description: 単語帳API
 *
 * components:
 *   schemas:
 *     Word:
 *       type: object
 *       required:
 *         - japanese
 *         - korean
 *       properties:
 *         _id:
 *           type: string
 *           description: 単語ID
 *         japanese:
 *           type: string
 *           description: 日本語
 *         korean:
 *           type: string
 *           description: 韓国語
 *         reading:
 *           type: string
 *           description: カタカナ読み
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 作成日時
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 更新日時
 */

import express from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import { validateAddWord } from '../validators/word.validator.js';
import { addWord, deleteWord, getWords } from '../controllers/word.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/words:
 *   get:
 *     summary: ユーザーの単語一覧取得
 *     tags: [Words]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: 単語リスト
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Word'
 *       401:
 *         description: 未認証
 */
router.get('/', requireAuth, getWords);

/**
 * @swagger
 * /api/words:
 *   post:
 *     summary: 単語追加
 *     tags: [Words]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - japanese
 *               - korean
 *             properties:
 *               japanese:
 *                 type: string
 *                 example: こんにちは
 *               korean:
 *                 type: string
 *                 example: 안녕하세요
 *               reading:
 *                 type: string
 *                 example: アンニョンハセヨ
 *     responses:
 *       201:
 *         description: 登録成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Word'
 *       400:
 *         description: バリデーションエラー
 *       401:
 *         description: 未認証
 */
router.post('/', requireAuth, validateAddWord, addWord);

/**
 * @swagger
 * /api/words/{id}:
 *   delete:
 *     summary: 単語削除
 *     tags: [Words]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 削除対象単語のID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 削除完了
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 削除しました
 *       401:
 *         description: 未認証
 *       404:
 *         description: 単語が見つからない
 */
router.delete('/:id', requireAuth, deleteWord);

export default router;
