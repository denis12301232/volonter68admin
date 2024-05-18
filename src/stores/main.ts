import type { IUser } from '@/types';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

export default defineStore('main', () => {
  const user = ref<IUser | null>(null);
  const isAuth = computed(() => !!user.value);

  watch(isAuth, (n) =>
    n ? localStorage.setItem('isAuth', '1') : localStorage.setItem('isAuth', '0')
  );

  return { user, isAuth };
});
