import Word from "../models/Word.js";

export const addWord = async (req, res) => {
  const { originalText, translatedText, pronunciationUrl, pitchData } = req.body;
  const userId = req.user.id;

  try {
    let existingWord = await Word.findOne({ userId, originalText });
    if (existingWord) {
      existingWord.lookupCount += 1;
      await existingWord.save();
      return res.status(200).json({ message: 'Updated count', word: existingWord });
    }

    const newWord = new Word({
      userId,
      originalText,
      translatedText,
      pronunciationUrl,
      pitchData
    });

    await newWord.save();
    res.status(201).json({ message: 'Word added successfully', word: newWord });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add word', error: error.message });
  }
};

export const getUserWords = async (req, res) => {
  const userId = req.user.id;

  try {
    const words = await Word.find({ userId }).sort({ lookupCount: -1 });
    res.status(200).json(words);
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to get words', error: error.message });
  }
};

export const deleteWord = async (req, res) => {
  const userId = req.user.id;
  const wordId = req.params.id;

  try {
    const result = await Word.findOneAndDelete({ _id: wordId, userId });

    if (!result) {
      return res.status(404).json({ message: 'Word not found or not owned by user' });
    }

    res.status(200).json({ message: 'Word deleted successfully', word: result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete word', error: error.message });
  }
};