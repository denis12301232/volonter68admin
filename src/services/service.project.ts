import type { Project } from '@/types';
import { $api } from '@/common/api';

export default class ProjectService {
  private readonly prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  index(query: Project.Index.Query) {
    return $api
      .get(
        `${this.prefix}?${new URLSearchParams({ page: query.page.toString(), limit: query.limit.toString() }).toString()}`
      )
      .json<Project.Index.Response>();
  }

  create(json: Project.Create.Body) {
    return $api.post(`${this.prefix}`, { json }).json<Project.Create.Response>();
  }

  show({ id }: Project.Show.Params) {
    return $api.get(`${this.prefix}/${id}`).json<Project.Show.Response>();
  }

  update({ id }: Project.Update.Params, json: Project.Update.Body) {
    return $api.patch(`${this.prefix}/${id}`, { json }).json<null>();
  }
}
