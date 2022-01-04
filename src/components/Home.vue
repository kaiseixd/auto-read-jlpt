<script setup lang="ts">
import { ref } from 'vue';
import { NButton } from 'naive-ui'

import library from "../assets/library";
import { initSpeech } from '../utils/speech';
import useLibrary from '../composables/useLibrary';
import { SpeechConfig } from '../types/speech';
import { Word } from '../types/words';

import Words from './Words.vue';

type Task = [SpeechConfig, Word, string]

const taskList = ref<Task[]>([]);
const currentWord = ref('');

const { initLibrary, setRandomWords, words } = useLibrary(library);
initLibrary();
setRandomWords(30);

async function read() {
  clearTask();

  words.value.forEach(word => {
    addTask({
      lang: 'ja-JP',
      volume: 1,
    }, word, word.hira);
    addTask({
      lang: 'zh-CN',
      volume: 0.5,
    }, word, word.zh);
  });

  startTask(async ([config, word, text]: [SpeechConfig, Word, string]) => {
    await readWithSpeech(config, word, text);
  });
}

function addTask(config: SpeechConfig, word: Word, text: string) {
  taskList.value.push([config, word, text]);
}

function clearTask() {
  taskList.value = [];
}

async function startTask(callback: (task: Task) => Promise<void>) {
  const task = taskList.value.shift();

  if (task) {
    await callback(task);
    startTask(callback);
  }
}

function sleep(timeout: number) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  })
}

async function readWithSpeech(config: SpeechConfig, word: Word, text: string) {
  const speech = await initSpeech(config);
  return new Promise(resolve => {
    speech.speak({
      text,
      queue: true,
      listeners: {
        onend: async () => {
          await sleep(1000);
          resolve(1);
        },
      }
    }).catch((e: unknown) => {
      console.log(e)
    });
    currentWord.value = word.index;
  });
}
</script>

<template>
  <div class="home-button-wrap">
    <NButton circle color="#8a2be2" @click="setRandomWords(30)">next words</NButton>
    <NButton circle color="#ff69b4" @click="read">read it</NButton>
  </div>
  <Words :data="words" :current="currentWord" />
</template>

<style scoped>
.home-button-wrap {
  margin-bottom: 12px;
}

.home-button-wrap button {
  width: 100px;
  margin: 0 12px;
}
</style>
