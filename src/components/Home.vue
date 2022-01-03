<script setup lang="ts">
import { ref } from 'vue';

import library from "../assets/library";
import { initSpeech } from '../utils/speech';
import useLibrary from '../composables/useLibrary';
import { SpeechConfig } from '../types/speech';

import Words from './Words.vue';

type Task = [SpeechConfig, string]

const taskList = ref<Task[]>([]);

const { initLibrary, setRandomWords, words } = useLibrary(library);
initLibrary();
setRandomWords(30);

async function read() {
  clearTask();

  words.value.forEach(word => {
    addTask({
      lang: 'ja-JP',
      voice: 'Kyoko',
    }, word.hira);
    addTask({
      lang: 'zh-CN',
      voice: 'Ting-Ting',
    }, word.zh);
  });

  startTask(async ([config, text]: [SpeechConfig, string]) => {
    await readWithSpeech(config, text);
  });
}

function addTask(config: SpeechConfig, text: string) {
  taskList.value.push([config, text]);
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

async function readWithSpeech(config: SpeechConfig, text: string) {
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
  });
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
