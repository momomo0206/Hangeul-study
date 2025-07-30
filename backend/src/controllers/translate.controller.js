import { handleServerError } from '../utils/errorHandler.js';

export const translateJapaneseToKorean = async (req, res) => {
  try {
    const { text } = req.body;

    const fakeKorean = '안녕하세요';
    const fakeReading = 'アンニョンハセヨ';
    const fakeAudioUrl = 'https://example.com/tts.mp3';

    res.json({
      japanese: text,
      korean: fakeKorean,
      reading: fakeReading,
      audioUrl: fakeAudioUrl
    });
  } catch (error) {
    handleServerError(res, error, 'Failed to translate');
  }
}