<script setup lang="ts">
import Card from 'primevue/card';
import { ref } from 'vue';

const cards = ref([
  { name: 'news', title: 'News' },
  { name: 'projects', title: 'Projects' },
]);
</script>

<template>
  <div class="flex flex-wrap justify-center gap-4 p-4">
    <Card v-for="(card, i) of cards" :key="i" class="w-full max-w-sm">
      <template #content>
        <div class="text-center">
          <RouterLink class="text-2xl hover:text-primary" :to="{ name: card.name }">
            {{ card.title }}
          </RouterLink>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped lang="scss"></style>
