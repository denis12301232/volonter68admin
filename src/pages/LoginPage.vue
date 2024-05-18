<script setup lang="ts">
import Button from 'primevue/button';
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import { reactive, watch, watchEffect } from 'vue';
import { useStore } from '@/stores';
import { Api } from '@/services';
import { useRouter } from 'vue-router';
import { useQuery } from '@/composables';

const store = useStore();
const router = useRouter();
const body = reactive({ login: '', password: '' });
const errors = reactive({ login: '', password: '' });
const { query: login, error, isLoading } = useQuery(Api.auth.login.bind(Api.auth));

watchEffect(() => store.isAuth && router.push({ name: 'home' }));
// watch(error, () => {
//   errors.login = errors.password = '';
//   if (error.value) {
//     error.value?.field === 'login'
//       ? (errors.login = error.value.message)
//       : (errors.password = error.value.message);
//   }
// });
</script>

<template>
  <div class="flex h-full items-center justify-center">
    <figure class="w-full max-w-md">
      <figcaption class="text-center text-3xl">Sign In</figcaption>
      <form class="mt-4" @submit.prevent="login(body)">
        <InputText v-model="body.login" class="mt-4 w-full" placeholder="Login" />
        <Password v-model="body.password" class="mt-4 w-full" placeholder="Password" toggle-mask />
        <div class="mt-4 flex justify-center">
          <Button type="submit" :disabled="!body.login || !body.password" :loading="isLoading">
            Submit
          </Button>
        </div>
      </form>
    </figure>
  </div>
</template>
