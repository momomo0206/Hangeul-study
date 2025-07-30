import express from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import { validateAddWord } from '../validators/word.validator.js';
import { addWord, deleteWord, getWords } from '../controllers/word.controller.js';

const router = express.Router();

router.get('/', requireAuth, getWords);
router.post('/', requireAuth, validateAddWord, addWord);
router.delete('/:id', requireAuth, deleteWord);

export default router;
