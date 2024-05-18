import type { Auth } from '@/types';
import { createFetch } from '@vueuse/core';
import { API_URL } from '@/utils';
import { useStore } from '@/stores';

export default createFetch({
  baseUrl: API_URL,
  combination: 'chain',
  fetchOptions: { credentials: 'include' },
  options: {
    async onFetchError(ctx) {
      if (ctx.response?.status === 401) {
        await fetch('/auth/refresh')
          .then<Auth.Refresh.Response>((response) => response.json())
          .then((json) => (useStore().user = json.user));
        await fetch(ctx.response.url).then((response) => (ctx.response = response));
      }
      return ctx;
    },
  },
});
