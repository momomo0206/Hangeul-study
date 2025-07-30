import Word from '../models/Word.js';
import { handleServerError } from '../utils/errorHandler.js';

export const getWords = async (req, res) => {
  try {
    const words = await Word.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(words);
  } catch (error) {
    handleServerError(res, error, 'Failed to get words');
  }
};

export const addWord = async (req, res) => {
  try {
    const { japanese, korean } = req.body;
    const exists = await Word.findOne({ user: req.user._id, japanese, korean });
    if (exists) return res.status(400).json({ message: 'Word already exists' });
    
    const word = new Word({
      user: req.user._id,
      japanese,
      korean
    });
    await word.save();
    res.status(201).json(word);
  } catch (error) {
    handleServerError(res, error, 'Failed to add word');
  }
};

export const deleteWord = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Word.findOneAndDelete({ _id: id, user: req.user._id });
    if (!deleted) return res.status(404).json({ message: 'Word not found' });
    res.json({ message: 'Word deleted successfully' });
  } catch (error) {
    handleServerError(res, error, 'Failed to delete word');
  }
};