<script setup lang="ts">
import { Word } from '../types/words';

defineProps<{ data: Word[] }>();
</script>

<template>
  <table>
    <tbody>
      <tr class="words-container" v-for="words in data" :key="words.index">
        <td class="words-content" v-for="(word, index) in words" :key="index">
          {{ word }} 
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  margin: 0 auto;
  max-width: 800px;
}
</style>
