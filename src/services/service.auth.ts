import type { Auth } from '@/types';
import { useStore } from '@/stores';
import { $api, $auth } from '@/common/api';

export default class AuthService {
  private readonly prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  login(json: Auth.Login.Body) {
    return $api
      .post(`${this.prefix}/login`, {
        json,
        hooks: {
          afterResponse: [
            (request, options, response) => {
              response.json().then((json: Auth.Login.Response) => (useStore().user = json.user));
            },
          ],
        },
      })
      .json<Auth.Login.Response>();
  }

  registration(json: Auth.Registration.Body) {
    return $api
      .post(`${this.prefix}/registration`, {
        json,
        hooks: {
          afterResponse: [
            (request, options, response) => {
              response
                .json()
                .then((json: Auth.Registration.Response) => (useStore().user = json.user));
            },
          ],
        },
      })
      .json<Auth.Registration.Response>();
  }

  logout() {
    return $api
      .delete(`${this.prefix}/logout`, {
        hooks: {
          afterResponse: [
            () => {
              useStore().user = null;
            },
          ],
        },
      })
      .json<null>();
  }

  refresh() {
    return $auth.get(`${this.prefix}/refresh`, {
      hooks: {
        afterResponse: [
          (request, options, response) => {
            response.json().then((json: Auth.Refresh.Response) => (useStore().user = json.user));
          },
        ],
      },
    });
  }
}
