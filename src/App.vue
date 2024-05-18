<script setup lang="ts">
import { Api } from '@/services';
import { onBeforeMount } from 'vue';
import Toast from 'primevue/toast';

onBeforeMount(() => {
  document.querySelector('html')?.classList.remove('dark');
  Number(localStorage.getItem('isAuth')) && Api.auth.refresh();
});
</script>

<template>
  <RouterView />
  <Toast></Toast>
</template>

<style></style>
