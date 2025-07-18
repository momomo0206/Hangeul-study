import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { addWord, deleteWord, getUserWords } from '../controllers/word.controller.js';

const router = express.Router();

router.post('/add', verifyToken, addWord);
router.get('/my', verifyToken, getUserWords);
router.delete('/:id', verifyToken, deleteWord);

export default router;