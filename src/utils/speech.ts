import Speech from "speak-tts";

import { SpeechConfig } from '../types/speech';

const speech = new Speech();
let voices = speechSynthesis.getVoices();

async function initSpeech(config: Partial<SpeechConfig>) {
  if (!voices.length) {
    voices = speechSynthesis.getVoices();
  }
  const voice = voices.find(item => item.lang === config.lang);
  await speech.init(Object.assign({
    volume: 1,
    lang: voice?.lang || 'ja-JP',
    rate: 1,
    pitch: 1,
    voice: voice?.name || "Kyoko",
    splitSentences: true,
  }, config));
  return speech;
}

export { initSpeech };
