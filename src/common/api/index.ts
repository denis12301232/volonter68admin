import type { Auth } from '@/types';
import ky from 'ky';
import { API_URL } from '@/utils';
import { useStore } from '@/stores';

export const $auth = ky.create({
  prefixUrl: API_URL,
  credentials: 'include',
});
export const $api = $auth.extend({
  hooks: {
    afterResponse: [
      (request, options, response) => {
        if (response.status === 401) {
          return $auth
            .get('auth/refresh')
            .json<Auth.Refresh.Response>()
            .then((json) => (useStore().user = json.user))
            .then(() => ky(request));
        }
      },
    ],
  },
});
