<script setup lang="ts">
import { Word } from '../types/words';

defineProps<{ data: Word[], current: string }>();
</script>

<template>
  <div class="words-container" :class="{ highlight: current === words.index }" v-for="words in data" :key="words.index">
    <div class="words-jp">{{`${words.kata} | ${words.hira}`}}</div>
    <div class="words-zh">{{words.zh}}</div>
  </div>
</template>

<style scoped>
.words-container {
  max-width: 400px;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 12px auto;
}

.words-container .words-jp {
  font-size: 16px;
  font-weight: 500;
}

.words-container.highlight .words-jp {
  color: #ff69b4;
}

.words-container .words-zh {
  font-size: 12px;
  color: #aaa;
}
</style>
