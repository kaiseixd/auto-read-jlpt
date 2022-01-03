import { ref } from 'vue';

import { Word } from '../types/words';

export default function useLibrary(library: string) {
  const wordsLib = ref<Word[]>([]);
  const words = ref<Word[]>([]);

  function initLibrary() {
    let lib = JSON.parse(library);
    lib = lib.map(([index, zh, kata, hira, grade]: string[]) => ({
      index, zh, kata, hira, grade
    }))
    wordsLib.value = lib;
  }

  function setRandomWords(length: number) {
    const count = wordsLib.value.length;
    const randomIndex = Math.floor(Math.random() * count);
    words.value = wordsLib.value.slice(randomIndex, randomIndex + length);
  }

  return { initLibrary, setRandomWords, words };
}
