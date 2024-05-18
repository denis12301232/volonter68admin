import type { News } from '@/types';
import { $api } from '@/common/api';

export default class NewsService {
  private readonly prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  index(query: News.Index.Query) {
    return $api
      .get(
        `${this.prefix}?${new URLSearchParams({ page: query.page.toString(), limit: query.limit.toString() }).toString()}`
      )
      .json<News.Index.Response>();
  }

  create(json: News.Create.Body) {
    return $api.post(`${this.prefix}`, { json }).json<News.Create.Response>();
  }

  show({ id }: News.Show.Params) {
    return $api.get(`${this.prefix}/${id}`).json<News.Show.Response>();
  }

  update({ id }: News.Update.Params, json: News.Update.Body) {
    return $api.patch(`${this.prefix}/${id}`, { json }).json<News.Update.Response>();
  }
}
