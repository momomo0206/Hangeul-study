import pkg from '@google-cloud/translate';
const { v2 } = pkg;
const { Translate } = v2;
// const { Translate } = pkg.v2;
import textToSpeech from '@google-cloud/text-to-speech';

export const translateClient = new Translate();
export const ttsClient = new textToSpeech.TextToSpeechClient();