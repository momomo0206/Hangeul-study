import Aromanize from 'aromanize';
import { translateClient, ttsClient } from '../config/google.js';
import TranslationCache from '../models/TranslationCache.js';
import { handleServerError } from '../utils/errorHandler.js';
import { uploadAudioToCloudinary } from '../utils/uploadAudioToCloudinary.js';

function toRoman(hangeulText) {
  return Aromanize.hangulToLatin(hangeulText, 'rr-translit');
}

export const translateJapaneseToKorean = async (req, res) => {
  try {
    const { text } = req.body;

    let cashed = await TranslationCache.findOne({ japanese: text });
    if (cashed) {
      return res.json({
        japanese: text,
        korean: cashed.korean,
        reading: cashed.reading,
        audioUrl: cashed.audioUrl,
        cache: true,
      });
    }

    const [translation] = await translateClient.translate(text, 'ko');
    const reading = toRoman(translation);

    const ttsRequest = {
      input: { text: translation },
      voice: { languageCode: 'ko-KR', ssmlGender: 'FEMALE' },
      audioConfig: { audioEncoding: 'MP3' },
    };
    const [ttsResponse] = await ttsClient.synthesizeSpeech(ttsRequest);

    let audioUrl = null;
    if (ttsResponse.audioContent) {
      const buffer = Buffer.from(ttsResponse.audioContent, 'base64');
      audioUrl = await uploadAudioToCloudinary(buffer);
    }

    await TranslationCache.create({
      japanese: text,
      korean: translation,
      reading,
      audioUrl,
      updatedAt: new Date(),
    });

    res.json({
      japanese: text,
      korean: translation,
      reading,
      audioUrl,
      cache: false,
    });
  } catch (error) {
    handleServerError(res, error, 'Failed to translate');
  }
};