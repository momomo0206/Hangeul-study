/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: 認証関連API
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: ユーザーID
 *         username:
 *           type: string
 *           description: ユーザー名
 *         email:
 *           type: string
 *           description: メールアドレス
 *         profileImage:
 *           type: string
 *           nullable: true
 *           description: プロフィール画像URL
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 *       description: JWTトークン（httpOnly Cookieで送信）
 */

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

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: ユーザー登録
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: taro
 *               email:
 *                 type: string
 *                 example: taro@example.com
 *               password:
 *                 type: string
 *                 example: pass1234
 *     responses:
 *       201:
 *         description: 登録成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *       400:
 *         description: バリデーションエラー
 */
router.post('/register', validateRegister, register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: ログイン
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: taro@example.com
 *               password:
 *                 type: string
 *                 example: pass1234
 *     responses:
 *       200:
 *         description: ログイン成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *       400:
 *         description: バリデーションエラー
 *       401:
 *         description: 認証失敗
 */
router.post('/login', validateLogin, login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: ログアウト
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: ログアウト成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ログアウトしました
 */
router.post('/logout', logout);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: プロフィール取得
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: プロフィール情報
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: 未認証
 */
router.get('/profile', requireAuth, getProfile);

/**
 * @swagger
 * /api/auth/profile:
 *   patch:
 *     summary: プロフィール編集
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: 新しいユーザー名
 *               profileImage:
 *                 type: string
 *                 example: https://cloudinary.com/image.jpg
 *     responses:
 *       200:
 *         description: 更新後のプロフィール情報
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: 未認証
 *       404:
 *         description: ユーザーが見つからない
 */
router.patch('/profile', requireAuth,validateProfileUpdate, updateProfile);

export default router;