<script setup lang="ts">
import { ref } from 'vue';

import library from "../assets/library";
import { initSpeech } from '../utils/speech';
import useLibrary from '../composables/useLibrary';

import Words from './Words.vue';

const { initLibrary, setRandomWords, words } = useLibrary(library);
initLibrary();
setRandomWords(30);

async function read() {
  for (let i = 0; i < words.value.length; i++) {
    const word = words.value[i];
    await readWithSpeech({
      lang: 'ja-JP',
      voice: 'Kyoko',
    }, word.kata);
    console.log(1)
    await readWithSpeech({
      lang: 'zh-CN',
      voice: 'Ting-Ting',
    }, word.zh);
  }
}

async function readWithSpeech(config: any, text: string) {
  const speech = await initSpeech(config);
  await speech.speak({
    text,
    queue: true,
    listeners: {
      onend: () => {},
    }
  })
}

</script>

<template>
  <div><button @click="setRandomWords(30)">udpate words</button></div>
  <div><button @click="read">read it</button></div>
  <Words :data="words" />
</template>

<style scoped>
button {
  width: 100px;
}
</style>
