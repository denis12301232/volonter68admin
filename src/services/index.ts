import AuthService from './service.auth';
import NewsService from './service.news';
import ProjectService from './service.project';

export namespace Api {
  export const auth = new AuthService('auth');
  export const news = new NewsService('news');
  export const project = new ProjectService('projects');
}
