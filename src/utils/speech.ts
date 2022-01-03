import Speech from "speak-tts";

import { SpeechConfig } from '../types/speech';

const speech = new Speech();

async function initSpeech(config: Partial<SpeechConfig>) {
  await speech.init({
    volume: 1,
    lang: config.lang || 'ja-JP',
    rate: 1,
    pitch: 1,
    voice: config.voice || "Kyoko",
    splitSentences: true,
  });
  return speech;
}

export { initSpeech };
