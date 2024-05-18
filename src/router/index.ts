import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '@/router/middlewares';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/test',
      component: () => import('@/pages/TestPage.vue'),
    },
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/pages/HomePage.vue'),
        },
        {
          path: '/news',
          name: 'news',
          component: () => import('@/pages/NewsPage.vue'),
        },
        {
          path: '/news/:id/edit',
          name: 'news-edit',
          component: () => import('@/pages/NewsEditPage.vue'),
        },
        {
          path: '/projects',
          name: 'projects',
          component: () => import('@/pages/ProjectsPage.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue'),
    },
    {
      path: '/news/create',
      component: () => import('@/layouts/VoidLayout.vue'),
      children: [
        {
          path: '/news/create',
          name: 'news-create',
          component: () => import('@/pages/NewsCreatePage.vue'),
        },
        {
          path: '/projects/create',
          name: 'projects-create',
          component: () => import('@/pages/ProjectCreatePage.vue'),
        },
      ],
    },
  ],
});

//router.beforeEach(auth);

export default router;
